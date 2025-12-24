"use client"

import { useState } from "react"
import ProductCatalog from "@/components/product-catalog"
import ShoppingCart from "@/components/shopping-cart"
import Header from "@/components/header"

export default function POSPage() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        <div className="flex-1 min-w-0">
          <ProductCatalog onAddToCart={addToCart} />
        </div>
        <div className="w-full lg:w-96">
          <ShoppingCart cart={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} onClear={clearCart} />
        </div>
      </div>
    </div>
  )
}
