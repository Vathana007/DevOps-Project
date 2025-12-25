"use client";

import { useState } from "react";
import { createOrder } from "@/lib/api";

interface CartItem {
  id: number;
  quantity: number;
}

interface CheckoutProps {
  total: number;
  itemCount: number;
  onClear: () => void;
  cartItems: CartItem[];
}

export default function Checkout({
  total,
  itemCount,
  onClear,
  cartItems,
}: CheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError("Cart is empty");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create order with API
      const orderData = {
        customer_name: "Guest Customer", // You can add a form to collect this
        customer_email: "guest@example.com", // You can add a form to collect this
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        tax: 0.1, // 10% tax
      };

      const response = await createOrder(orderData);

      console.log("Order created:", response);

      setIsCompleted(true);

      // Clear cart and reset after success
      setTimeout(() => {
        setIsCompleted(false);
        onClear();
      }, 2000);
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "Failed to complete checkout. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2 text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      <button
        onClick={handleCheckout}
        disabled={isProcessing || itemCount === 0}
        className={`w-full py-3 rounded-lg font-bold text-base transition-all duration-300 cursor-pointer ${
          isCompleted
            ? "bg-green-500 text-white"
            : "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span> Processing...
          </span>
        ) : isCompleted ? (
          "✓ Order Completed!"
        ) : (
          `Checkout • $${total.toFixed(2)}`
        )}
      </button>

      <button
        onClick={onClear}
        disabled={isProcessing}
        className="w-full py-2 rounded-lg font-semibold text-sm border border-border text-foreground hover:bg-secondary transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        Clear Cart
      </button>
    </div>
  );
}
