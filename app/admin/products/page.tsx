"use client";

import { useState, useEffect } from "react";
import { Edit, Eye, ToggleLeft, ToggleRight, Loader2, Package, Plus, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useCsrfToken } from "@/hooks/useCsrfToken";

// Product type from database
interface DBProduct {
  id: number;
  name: string;
  slug: string;
  icon: string;
  subtitle: string;
  price_min: number;
  price_max: number;
  active: number;
  updated_at: string;
}

// Category options
const categories = [
  { value: "ed-sexual-health", label: "ED Sexual Health" },
  { value: "prostate", label: "Prostate" },
  { value: "diabetes", label: "Diabetes" },
  { value: "infection", label: "Infection" },
  { value: "joint-pain", label: "Joint Pain" },
  { value: "blood-pressure", label: "Blood Pressure" },
  { value: "ulcer", label: "Ulcer" },
];

// Emoji options
const emojiOptions = ["💪", "🛡️", "🩸", "🦠", "🦴", "❤️", "💊", "🌿", "🔥", "⚡", "✨", "🎯", "🚀", "💚", "💙", "💛"];

export default function ProductsPage() {
  const { csrfToken, getCsrfHeaders } = useCsrfToken();
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedProduct, setSelectedProduct] = useState<DBProduct | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    subtitle: "",
    icon: "📦",
    price_min: "",
    price_max: "",
    active: true,
  });

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      name: "",
      slug: "",
      subtitle: "",
      icon: "📦",
      price_min: "",
      price_max: "",
      active: true,
    });
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product: DBProduct) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      subtitle: product.subtitle || "",
      icon: product.icon || "📦",
      price_min: product.price_min?.toString() || "",
      price_max: product.price_max?.toString() || "",
      active: product.active === 1,
    });
    setModalOpen(true);
  };

  const openViewModal = (product: DBProduct) => {
    setModalMode("view");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    setSaving(false);
    setDeleting(false);
    setShowDeleteConfirm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleEmojiSelect = (emoji: string) => {
    setFormData((prev) => ({ ...prev, icon: emoji }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csrfToken) {
      toast.error("Security token not loaded. Please refresh the page.");
      return;
    }
    setSaving(true);

    try {
      const payload = {
        ...formData,
        price_min: parseInt(formData.price_min) || 0,
        price_max: parseInt(formData.price_max) || 0,
        active: formData.active,
        ...(modalMode === "edit" && selectedProduct ? { id: selectedProduct.id } : {}),
      };

      const response = await fetch("/api/products", {
        method: modalMode === "add" ? "POST" : "PUT",
        headers: getCsrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save product");
      }

      const result = await response.json();
      
      if (modalMode === "add") {
        const newProduct = result.product as DBProduct | undefined;
        if (!newProduct) {
          throw new Error("Product was created but no product data was returned");
        }
        setProducts(prev => [...prev, newProduct]);
        toast.success("Product created successfully");
      } else if (selectedProduct) {
        const updatedProduct = (result.product as DBProduct | undefined) ?? {
          ...selectedProduct,
          ...payload,
          active: payload.active ? 1 : 0,
        };
        setProducts(prev => prev.map(p =>
          p.id === selectedProduct.id ? updatedProduct : p
        ));
        toast.success("Product updated successfully");
      }

      closeModal();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const toggleProductStatus = async (product: DBProduct) => {
    if (!csrfToken) {
      toast.error("Security token not loaded. Please refresh the page.");
      return;
    }
    const newStatus = product.active === 1 ? 0 : 1;
    
    // Optimistic update
    setProducts(prev => prev.map(p => 
      p.id === product.id ? { ...p, active: newStatus } : p
    ));

    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: getCsrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          id: product.id,
          active: newStatus === 1,
        }),
      });

      if (!response.ok) throw new Error("Failed to update status");
      toast.success(`Product ${newStatus === 1 ? 'activated' : 'deactivated'}`);
    } catch (err) {
      // Rollback on error
      setProducts(prev => prev.map(p => 
        p.id === product.id ? { ...p, active: product.active } : p
      ));
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    if (!csrfToken) {
      toast.error("Security token not loaded. Please refresh the page.");
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/products?id=${selectedProduct.id}`, {
        method: "DELETE",
        headers: getCsrfHeaders(),
      });

      if (!response.ok) throw new Error("Failed to delete product");
      
      // Update local state
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      toast.success("Product deleted successfully");
      
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
          <button onClick={() => setError(null)} className="ml-2 text-sm underline">Dismiss</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
        >
          <Plus size={18} />
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Slug</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price Range</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{product.icon || "📦"}</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500 hidden sm:block">{product.subtitle || "No subtitle"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                    {product.slug}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(product.price_min)} - {formatPrice(product.price_max)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <button
                      onClick={() => toggleProductStatus(product)}
                      className={`flex items-center gap-1 font-medium text-sm transition-colors ${
                        product.active === 1
                          ? "text-green-600 hover:text-green-700"
                          : "text-gray-400 hover:text-gray-500"
                      }`}
                    >
                      {product.active === 1 ? (
                        <>
                          <ToggleRight size={20} />
                          <span className="hidden sm:inline">Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={20} />
                          <span className="hidden sm:inline">Inactive</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => openViewModal(product)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="View product"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <Edit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No products found</p>
            <button
              onClick={openAddModal}
              className="mt-4 text-green-600 hover:underline"
            >
              Add your first product
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === "add" && "Add New Product"}
                {modalMode === "edit" && "Edit Product"}
                {modalMode === "view" && "View Product"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {modalMode === "view" && selectedProduct ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <span className="text-4xl">{selectedProduct.icon || "📦"}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.name}</h3>
                      <p className="text-gray-500">{selectedProduct.subtitle || "No subtitle"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Slug</p>
                      <p className="font-medium text-gray-900">{selectedProduct.slug}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        selectedProduct.active === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {selectedProduct.active === 1 ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Min Price</p>
                      <p className="font-medium text-gray-900">{formatPrice(selectedProduct.price_min)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Max Price</p>
                      <p className="font-medium text-gray-900">{formatPrice(selectedProduct.price_max)}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => openEditModal(selectedProduct)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                    >
                      <Edit size={18} />
                      Edit Product
                    </button>
                    <Link
                      href={`/${selectedProduct.slug}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition-colors"
                    >
                      <Eye size={18} />
                      View on Site
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="e.g. ED & Sexual Health"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category / Slug *
                    </label>
                    <select
                      name="slug"
                      value={formData.slug}
                      onChange={handleCategoryChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    >
                      <option value="">Select a category...</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle / Pack Name
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      placeholder="e.g. Reodeo/Vigormax Capsules"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon / Emoji
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {emojiOptions.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleEmojiSelect(emoji)}
                          className={`w-10 h-10 text-xl rounded-lg border transition-colors ${
                            formData.icon === emoji
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Price (₦)
                      </label>
                      <input
                        type="number"
                        name="price_min"
                        value={formData.price_min}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        placeholder="43500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Price (₦)
                      </label>
                      <input
                        type="number"
                        name="price_max"
                        value={formData.price_max}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        placeholder="89000"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="active"
                      name="active"
                      checked={formData.active}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="active" className="text-sm text-gray-700">
                      Active (visible on website)
                    </label>
                  </div>

                  {/* Delete Confirmation */}
                  {showDeleteConfirm ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                      <p className="text-red-800 font-medium mb-3">Are you sure you want to delete this product? This action cannot be undone.</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleDelete}
                          disabled={deleting}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {deleting ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                          Yes, Delete
                        </button>
                        <button
                          type="button"
                          onClick={cancelDelete}
                          disabled={deleting}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex gap-3 pt-4">
                    {modalMode === "edit" && !showDeleteConfirm && (
                      <button
                        type="button"
                        onClick={confirmDelete}
                        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium transition-colors"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50"
                    >
                      {saving && <Loader2 size={18} className="animate-spin" />}
                      {modalMode === "add" ? "Create Product" : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
