"use client"

import CartItem from "./cart-item"
import Checkout from "./checkout"

interface CartItemType {
  id: number;
  name: string;
  price: number | string;
  quantity: number;
}

interface ShoppingCartProps {
  cart: CartItemType[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClear: () => void;
}

export default function ShoppingCart({ cart, onRemove, onUpdateQuantity, onClear }: ShoppingCartProps) {
  const subtotal = cart.reduce((sum, item) => sum + (typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Shopping Cart</h2>
        <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
          {cart.length}
        </span>
      </div>

      <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Cart is empty</p>
          </div>
        ) : (
          cart.map((item) => (
            <CartItem key={item.id} item={item} onRemove={onRemove} onUpdateQuantity={onUpdateQuantity} />
          ))
        )}
      </div>

      {cart.length > 0 && (
        <>
          <div className="border-t border-border pt-4 space-y-2 mb-6">
            <div className="flex justify-between text-sm text-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-foreground">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-accent">${total.toFixed(2)}</span>
            </div>
          </div>

          <Checkout total={total} itemCount={cart.length} onClear={onClear} />
        </>
      )}
    </div>
  )
}
