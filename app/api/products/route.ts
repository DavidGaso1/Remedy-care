import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateCsrfToken } from "@/lib/csrf";

function requireCsrf(request: Request): NextResponse | null {
  const csrfToken = request.headers.get("X-CSRF-Token");
  if (!csrfToken || !validateCsrfToken(csrfToken)) {
    return NextResponse.json(
      { error: "Invalid or missing CSRF token" },
      { status: 403 }
    );
  }
  return null; // null means CSRF passed
}

// GET all products
export async function GET() {
  try {
    const products = db.prepare("SELECT * FROM products ORDER BY id").all();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const csrfError = requireCsrf(request);
    if (csrfError) return csrfError;

    const body = await request.json();
    const { name, slug, icon, subtitle, price_min, price_max, active } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }
    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    // Validate slug format (lowercase, alphanumeric, hyphens only)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug must be lowercase alphanumeric with hyphens only" },
        { status: 400 }
      );
    }

    // Validate price ranges
    if (price_min !== undefined && (typeof price_min !== "number" || price_min < 0)) {
      return NextResponse.json(
        { error: "price_min must be a non-negative number" },
        { status: 400 }
      );
    }
    if (price_max !== undefined && (typeof price_max !== "number" || price_max < 0)) {
      return NextResponse.json(
        { error: "price_max must be a non-negative number" },
        { status: 400 }
      );
    }

    // Sanitize string inputs with length limits
    const sanitizedName = name.trim().slice(0, 200);
    const sanitizedSlug = slug.trim().slice(0, 100);
    const sanitizedIcon = icon ? String(icon).trim().slice(0, 10) : "📦";
    const sanitizedSubtitle = subtitle ? String(subtitle).trim().slice(0, 300) : "";

    // Check if slug already exists
    const existing = db.prepare("SELECT * FROM products WHERE slug = ?").get(sanitizedSlug);
    if (existing) {
      return NextResponse.json(
        { error: "A product with this slug already exists" },
        { status: 400 }
      );
    }

    const result = db.prepare(
      "INSERT INTO products (name, slug, icon, subtitle, price_min, price_max, active) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).run(
      sanitizedName,
      sanitizedSlug,
      sanitizedIcon,
      sanitizedSubtitle,
      price_min || 0,
      price_max || 0,
      active ? 1 : 0
    );

    const newProduct = db.prepare("SELECT * FROM products WHERE id = ?").get(result.lastInsertRowid);

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// PUT update existing product
export async function PUT(request: NextRequest) {
  try {
    const csrfError = requireCsrf(request);
    if (csrfError) return csrfError;

    const body = await request.json();
    const { id, name, slug, icon, subtitle, price_min, price_max, active } = body;

    if (!id || typeof id !== "number" || id <= 0) {
      return NextResponse.json(
        { error: "Valid product ID is required" },
        { status: 400 }
      );
    }

    // Validate slug format if provided
    if (slug !== undefined && slug !== null) {
      if (typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug.trim())) {
        return NextResponse.json(
          { error: "Slug must be lowercase alphanumeric with hyphens only" },
          { status: 400 }
        );
      }
    }

    // Validate price ranges if provided
    if (price_min !== undefined && price_min !== null && (typeof price_min !== "number" || price_min < 0)) {
      return NextResponse.json(
        { error: "price_min must be a non-negative number" },
        { status: 400 }
      );
    }
    if (price_max !== undefined && price_max !== null && (typeof price_max !== "number" || price_max < 0)) {
      return NextResponse.json(
        { error: "price_max must be a non-negative number" },
        { status: 400 }
      );
    }

    // Check if product exists
    const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // If slug is changing, check if new slug already exists
    if (slug && slug !== (existing as { slug: string }).slug) {
      const slugExists = db.prepare("SELECT * FROM products WHERE slug = ? AND id != ?").get(slug, id);
      if (slugExists) {
        return NextResponse.json(
          { error: "A product with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Sanitize string inputs with length limits
    const sanitizedName = name !== undefined ? String(name).trim().slice(0, 200) : (existing as { name: string }).name;
    const sanitizedSlug = slug !== undefined ? String(slug).trim().slice(0, 100) : (existing as { slug: string }).slug;
    const sanitizedIcon = icon !== undefined ? String(icon).trim().slice(0, 10) : (existing as { icon: string }).icon;
    const sanitizedSubtitle = subtitle !== undefined ? String(subtitle).trim().slice(0, 300) : (existing as { subtitle: string }).subtitle;

    db.prepare(
      "UPDATE products SET name = ?, slug = ?, icon = ?, subtitle = ?, price_min = ?, price_max = ?, active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(
      sanitizedName,
      sanitizedSlug,
      sanitizedIcon,
      sanitizedSubtitle,
      price_min ?? (existing as { price_min: number }).price_min,
      price_max ?? (existing as { price_max: number }).price_max,
      active !== undefined ? (active ? 1 : 0) : (existing as { active: number }).active,
      id
    );

    const updatedProduct = db.prepare("SELECT * FROM products WHERE id = ?").get(id);

    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(request: NextRequest) {
  try {
    const csrfError = requireCsrf(request);
    if (csrfError) return csrfError;

    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get("id");

    if (!idStr) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const id = parseInt(idStr, 10);
    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { error: "Valid product ID is required" },
        { status: 400 }
      );
    }

    const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    db.prepare("DELETE FROM products WHERE id = ?").run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
