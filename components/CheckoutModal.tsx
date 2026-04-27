"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [submitHovered, setSubmitHovered] = useState(false);

  // Track focus state per field for floating label animation
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
      setFocusedField(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const webhookPayload = {
        type: "order",
        productName,
        packLabel,
        packPrice,
        packBottles,
        customer: formData.name,
        phone: formData.phone,
        address: formData.address,
        deliveryDate: formData.deliveryDate,
        paymentOption: formData.paymentOption,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to process order.");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error && err.message
          ? err.message
          : "An error occurred while processing your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFieldActive = (field: string, value: string) =>
    focusedField === field || value.length > 0;

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px",
    padding: "16px 20px",
    color: "white",
    fontSize: "1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    colorScheme: "dark" as React.CSSProperties["colorScheme"],
  };

  const inputFocusClass =
    "focus:border-[rgba(74,222,128,0.5)] focus:shadow-[0_0_0_3px_rgba(74,222,128,0.1)]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-8 w-full max-w-[560px]"
        style={{ margin: "2rem auto" }}
        onClick={(e) => e.stopPropagation()}
    >
      {/* Liquid Blob Background */}
      <motion.div
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Form Card */}
      <div
        className="relative z-10 flex flex-col"
        style={{
          background: "#0f1117",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "32px",
          height: "auto",
          overflow: "visible",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-1.5 transition-colors z-20"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-white mb-1">Complete Your Order</h2>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
          Fill in your details for fast delivery.
        </p>

        {/* Product Summary Box */}
        <div
          className="flex items-center gap-4 mb-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          {productImage && (
            <div
              className="w-16 h-16 relative flex-shrink-0"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: "12px",
                padding: "4px",
              }}
            >
              <Image src={productImage} alt={productName} fill className="object-contain" />
            </div>
          )}
          <div>
            <p className="font-bold text-white text-sm">{productName}</p>
            <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
              {packLabel} ({packBottles} bottles)
            </p>
            <p className="font-bold text-lg" style={{ color: "#4ade80" }}>
              ₦{packPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="mb-4 p-3 flex items-start gap-2"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "12px",
              color: "rgba(239,68,68,0.9)",
              fontSize: "0.875rem",
            }}
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {submitted ? (
          <div
            className="p-5"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "16px",
            }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="shrink-0 mt-0.5" size={18} style={{ color: "#4ade80" }} />
              <div>
                <p className="font-bold" style={{ color: "#4ade80" }}>
                  Thank you for your order!
                </p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                  We have received your request. Our team will contact you shortly to further
                  process your payment.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form id="checkout-form" onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              style={{ position: "relative", marginBottom: "16px" }}
            >
              <label
                className="block font-medium"
                style={{
                  marginBottom: "8px",
                  fontSize: isFieldActive("name", formData.name) ? "0.75rem" : "0.875rem",
                  color: isFieldActive("name", formData.name)
                    ? "rgba(74, 222, 128, 0.8)"
                    : "rgba(255,255,255,0.6)",
                  transform: isFieldActive("name", formData.name)
                    ? "translateY(-4px)"
                    : "translateY(0)",
                  transition: "font-size 0.2s ease, transform 0.2s ease, color 0.2s ease",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                required
                style={inputStyle}
                className={inputFocusClass}
                placeholder="e.g. Chukwuemeka Okoye"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            {/* Phone Number Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              style={{ position: "relative", marginBottom: "16px" }}
            >
              <label
                className="block font-medium"
                style={{
                  marginBottom: "8px",
                  fontSize: isFieldActive("phone", formData.phone) ? "0.75rem" : "0.875rem",
                  color: isFieldActive("phone", formData.phone)
                    ? "rgba(74, 222, 128, 0.8)"
                    : "rgba(255,255,255,0.6)",
                  transform: isFieldActive("phone", formData.phone)
                    ? "translateY(-4px)"
                    : "translateY(0)",
                  transition: "font-size 0.2s ease, transform 0.2s ease, color 0.2s ease",
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                required
                style={inputStyle}
                className={inputFocusClass}
                placeholder="e.g. 08012345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>

            {/* Full Delivery Address Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              style={{ position: "relative", marginBottom: "16px" }}
            >
              <label
                className="block font-medium"
                style={{
                  marginBottom: "8px",
                  fontSize: isFieldActive("address", formData.address) ? "0.75rem" : "0.875rem",
                  color: isFieldActive("address", formData.address)
                    ? "rgba(74, 222, 128, 0.8)"
                    : "rgba(255,255,255,0.6)",
                  transform: isFieldActive("address", formData.address)
                    ? "translateY(-4px)"
                    : "translateY(0)",
                  transition: "font-size 0.2s ease, transform 0.2s ease, color 0.2s ease",
                }}
              >
                Full Delivery Address
              </label>
              <textarea
                required
                rows={2}
                style={{ ...inputStyle, resize: "none" }}
                className={inputFocusClass}
                placeholder="Include House Number, Street, and State"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                onFocus={() => setFocusedField("address")}
                onBlur={() => setFocusedField(null)}
              />

              {/* Payment Notice */}
              <div
                className="mt-3 flex items-start gap-2.5"
                style={{
                  background: "rgba(234, 179, 8, 0.08)",
                  border: "1px solid rgba(234, 179, 8, 0.2)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#eab308" }} />
                <div style={{ fontSize: "0.8rem" }}>
                  <p className="font-semibold mb-1">Important Notice</p>
                  <p className="leading-relaxed">
                    For locations outside our confirmed delivery zones, payment may be required
                    before delivery. Our team will contact you to confirm your location and payment
                    details after you submit this order.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Delivery Date & Payment Method */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                style={{ position: "relative", marginBottom: "16px" }}
              >
                <label
                  className="block font-medium"
                  style={{
                    marginBottom: "8px",
                    fontSize: isFieldActive("deliveryDate", formData.deliveryDate)
                      ? "0.75rem"
                      : "0.875rem",
                    color: isFieldActive("deliveryDate", formData.deliveryDate)
                      ? "rgba(74, 222, 128, 0.8)"
                      : "rgba(255,255,255,0.6)",
                    transform: isFieldActive("deliveryDate", formData.deliveryDate)
                      ? "translateY(-4px)"
                      : "translateY(0)",
                    transition: "font-size 0.2s ease, transform 0.2s ease, color 0.2s ease",
                  }}
                >
                  Delivery Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  style={inputStyle}
                  className={inputFocusClass}
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  onFocus={() => setFocusedField("deliveryDate")}
                  onBlur={() => setFocusedField(null)}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                style={{ position: "relative", marginBottom: "16px" }}
              >
                <label
                  className="block font-medium"
                  style={{
                    marginBottom: "8px",
                    fontSize: isFieldActive("paymentOption", formData.paymentOption)
                      ? "0.75rem"
                      : "0.875rem",
                    color: isFieldActive("paymentOption", formData.paymentOption)
                      ? "rgba(74, 222, 128, 0.8)"
                      : "rgba(255,255,255,0.6)",
                    transform: isFieldActive("paymentOption", formData.paymentOption)
                      ? "translateY(-4px)"
                      : "translateY(0)",
                    transition: "font-size 0.2s ease, transform 0.2s ease, color 0.2s ease",
                  }}
                >
                  Payment Method
                </label>
                <select
                  style={{ ...inputStyle, colorScheme: "dark" }}
                  className={inputFocusClass}
                  value={formData.paymentOption}
                  onChange={(e) => setFormData({ ...formData, paymentOption: e.target.value })}
                  onFocus={() => setFocusedField("paymentOption")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="Transfer" style={{ background: "#0f1117" }}>Bank Transfer on Delivery</option>
                  <option value="Cash" style={{ background: "#0f1117" }}>Cash on Delivery</option>
                </select>
              </motion.div>
            </div>
          </form>
        )}

        {/* Payment Confirmation Notice */}
        <div
          className="flex items-center gap-2 mt-2 mb-4"
          style={{
            background: "rgba(234, 179, 8, 0.08)",
            border: "1px solid rgba(234, 179, 8, 0.2)",
            borderRadius: "12px",
            padding: "14px 16px",
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.85rem",
          }}
        >
          <CheckCircle2 size={16} className="shrink-0" style={{ color: "#eab308" }} />
          <p>
            You will pay <strong>₦{packPrice.toLocaleString()}</strong> exactly when the product is
            delivered to you.
          </p>
        </div>

        {/* Submit / Close Button */}
        {submitted ? (
          <button
            type="button"
            onClick={onClose}
            className="w-full py-4 font-bold transition-all"
            style={{
              background: "#0f1117",
              color: "white",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "9999px",
            }}
          >
            Close
          </button>
        ) : (
          <motion.button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            onHoverStart={() => setSubmitHovered(true)}
            onHoverEnd={() => setSubmitHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="w-full font-bold cursor-pointer"
            style={{
              position: "relative",
              overflow: "hidden",
              background: "#22c55e",
              color: "#000000",
              border: "none",
              borderRadius: "9999px",
              padding: "16px 32px",
              fontSize: "1rem",
              fontWeight: 700,
            }}
          >
            <motion.span
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.1)",
                borderRadius: "9999px",
                originX: 0,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: submitHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>
              {isSubmitting ? (
                <span
                  className="inline-block w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"
                />
              ) : (
                <>
                  <MessageCircle size={20} className="inline mr-2" />
                  Submit Order
                </>
              )}
            </span>
          </motion.button>
        )}
      </div>
    </motion.div>
    </div>
  );
}
