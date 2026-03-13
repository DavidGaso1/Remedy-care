import Database from "better-sqlite3";
import path from "path";

export interface SiteSettings {
  id: number;
  site_name: string;
  site_description: string;
  currency: string;
  whatsapp_number: string;
  default_message: string;
  consultation_message: string;
  new_order_notifications: number;
  new_message_notifications: number;
  low_stock_alerts: number;
  weekly_reports: number;
  admin_email: string;
  primary_color: string;
  accent_color: string;
  updated_at: string;
}

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "data.db");
const db = new Database(dbPath);

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT UNIQUE,
    customer TEXT NOT NULL,
    phone TEXT NOT NULL,
    product TEXT NOT NULL,
    amount INTEGER NOT NULL,
    address TEXT,
    delivery_date TEXT,
    payment_option TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    product TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    site_name TEXT DEFAULT 'Advanced Natural Remedy',
    site_description TEXT DEFAULT 'Science-backed natural solutions',
    currency TEXT DEFAULT 'NGN',
    whatsapp_number TEXT DEFAULT '+2349061505041',
    default_message TEXT DEFAULT 'Hello Dr I want to order {product}',
    consultation_message TEXT DEFAULT 'Hello I need a consultation',
    new_order_notifications INTEGER DEFAULT 1,
    new_message_notifications INTEGER DEFAULT 1,
    low_stock_alerts INTEGER DEFAULT 0,
    weekly_reports INTEGER DEFAULT 1,
    admin_email TEXT DEFAULT 'admin@example.com',
    primary_color TEXT DEFAULT '#16a34a',
    accent_color TEXT DEFAULT '#f59e0b',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    active INTEGER DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert default settings if not exists
const settings = db.prepare("SELECT * FROM settings WHERE id = 1").get() as SiteSettings | undefined;
if (!settings) {
  db.prepare(`
    INSERT INTO settings (id) VALUES (1)
  `).run();
}

// Add extra columns if upgrading from old schema
try { db.exec("ALTER TABLE products ADD COLUMN subtitle TEXT DEFAULT ''"); } catch { }
try { db.exec("ALTER TABLE products ADD COLUMN price_min INTEGER DEFAULT 0"); } catch { }
try { db.exec("ALTER TABLE products ADD COLUMN price_max INTEGER DEFAULT 0"); } catch { }
try { db.exec("ALTER TABLE orders ADD COLUMN address TEXT"); } catch { }
try { db.exec("ALTER TABLE orders ADD COLUMN delivery_date TEXT"); } catch { }
try { db.exec("ALTER TABLE orders ADD COLUMN payment_option TEXT"); } catch { }

// Insert default products if not exists
const products = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (products.count === 0) {
  const insertProduct = db.prepare("INSERT INTO products (name, slug, icon, subtitle, price_min, price_max) VALUES (?, ?, ?, ?, ?, ?)");
  insertProduct.run("ED & Sexual Health", "ed-sexual-health", "Activity", "Reodeo/Vigormax Capsules", 43500, 89000);
  insertProduct.run("Prostate Health", "prostate", "ShieldCheck", "Reodeo + Prostbeta Pack", 47500, 115500);
  insertProduct.run("Diabetes Control", "diabetes", "Droplet", "NMN Capsules", 44500, 89500);
  insertProduct.run("Infection Relief", "infection", "ShieldAlert", "Herbal Infection Pack", 63500, 95500);
  insertProduct.run("Joint Pain & Arthritis", "joint-pain", "Bone", "Joint Relief Pack", 39500, 81500);
  insertProduct.run("Blood Pressure", "blood-pressure", "Heart", "HBP Solution Pack", 49500, 107500);
  insertProduct.run("Ulcer Relief", "ulcer", "Leaf", "Ulcer Care Pack", 49500, 105570);
}

// Back-fill subtitle/prices for existing rows that have zeros
const seedPrices: Array<[string, string, number, number]> = [
  ["ed-sexual-health", "Reodeo/Vigormax Capsules", 43500, 89000],
  ["prostate", "Reodeo + Prostbeta Pack", 47500, 115500],
  ["diabetes", "NMN Capsules", 44500, 89500],
  ["infection", "Herbal Infection Pack", 63500, 95500],
  ["joint-pain", "Joint Relief Pack", 39500, 81500],
  ["blood-pressure", "HBP Solution Pack", 49500, 107500],
  ["ulcer", "Ulcer Care Pack", 49500, 105570],
];
const backfill = db.prepare(
  "UPDATE products SET subtitle = ?, price_min = ?, price_max = ? WHERE slug = ? AND (price_min = 0 OR price_min IS NULL)"
);
for (const [slug, subtitle, min, max] of seedPrices) {
  backfill.run(subtitle, min, max, slug);
}

export { db };

export function getSettings() {
  return db.prepare("SELECT * FROM settings WHERE id = 1").get() as SiteSettings | undefined;
}
