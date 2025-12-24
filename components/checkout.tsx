"use client"

import { useState } from "react"

export default function Checkout({ total, itemCount, onClear }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleCheckout = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsProcessing(false)
    setIsCompleted(true)
    setTimeout(() => {
      setIsCompleted(false)
      onClear()
    }, 2000)
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleCheckout}
        disabled={isProcessing}
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
  )
}
