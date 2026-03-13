import { useState, useEffect } from "react";
import { X, CheckCircle2, MessageCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    packLabel: string;
    packPrice: number;
    packBottles: number;
    productImage?: string;
}

export default function CheckoutModal({
    isOpen,
    onClose,
    productName,
    packLabel,
    packPrice,
    packBottles,
    productImage,
}: Props) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        deliveryDate: "",
        paymentOption: "Transfer",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: "",
                phone: "",
                address: "",
                deliveryDate: "",
                paymentOption: "Transfer",
            });
            setError("");
            setSubmitted(false);
            setIsSubmitting(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const message = `New order request\n\nProduct: ${productName}\nPack: ${packLabel} (${packBottles} bottle${packBottles > 1 ? "s" : ""})\nPrice: ₦${packPrice.toLocaleString()}\n\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nDelivery Date: ${formData.deliveryDate}\nPayment Method: ${formData.paymentOption}`;

            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: "",
                    product: `${productName} - ${packLabel}`,
                    message,
                    status: "new",
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to process order.");
            }

            setSubmitted(true);

        } catch (err) {
            console.error(err);
            setError("An error occurred while processing your order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <h2 className="text-xl font-bold mb-1">Complete Your Order</h2>
                    <p className="text-primary-100 text-sm">Fill in your details for fast delivery.</p>
                </div>

                {/* Order Summary */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-gray-100 dark:border-white/5 shrink-0 flex items-center gap-4">
                    {productImage && (
                        <div className="w-16 h-16 relative bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-white/10 p-1 flex-shrink-0">
                            <Image src={productImage} alt={productName} fill className="object-contain" />
                        </div>
                    )}
                    <div>
                        <p className="font-bold text-dark dark:text-white text-sm">{productName}</p>
                        <p className="text-xs text-slate-500 mb-1">{packLabel} ({packBottles} bottles)</p>
                        <p className="font-bold text-primary text-lg">₦{packPrice.toLocaleString()}</p>
                    </div>
                </div>

                {/* Form Body - Scrollable */}
                <div className="p-6 overflow-y-auto">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-xl text-sm flex items-start gap-2">
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    {submitted ? (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/20 rounded-2xl p-5">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" size={18} />
                                <div>
                                    <p className="font-bold text-green-800 dark:text-green-300">Thank you for your order!</p>
                                    <p className="text-sm text-green-800/80 dark:text-green-300/80 mt-1">
                                        We have received your request. Our team will contact you shortly to further process your payment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                    placeholder="e.g. Chukwuemeka Okoye"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                    placeholder="e.g. 08012345678"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Delivery Address</label>
                                <textarea
                                    required
                                    rows={2}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white resize-none"
                                    placeholder="Include House Number, Street, and State"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Delivery Date</label>
                                    <input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]} // Cannot select past dates
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                        value={formData.deliveryDate}
                                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Payment Method</label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                        value={formData.paymentOption}
                                        onChange={(e) => setFormData({ ...formData, paymentOption: e.target.value })}
                                    >
                                        <option value="Transfer">Bank Transfer on Delivery</option>
                                        <option value="Cash">Cash on Delivery</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50 shrink-0">
                    <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg border border-amber-200/50 dark:border-amber-500/20 mb-4">
                        <CheckCircle2 size={16} className="shrink-0" />
                        <p>You will pay <strong>₦{packPrice.toLocaleString()}</strong> exactly when the product is delivered to you.</p>
                    </div>
                    {submitted ? (
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                        >
                            Close
                        </button>
                    ) : (
                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                            {isSubmitting ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <MessageCircle size={20} />
                                    Submit Order
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
