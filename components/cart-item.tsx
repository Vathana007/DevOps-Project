"use client"

interface CartItemType {
  id: number;
  name: string;
  price: number | string;
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
  
  return (
    <div className="flex items-center gap-3 bg-secondary p-3 rounded-lg border border-border">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">${price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-6 h-6 flex items-center justify-center bg-background border border-border rounded text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-bold cursor-pointer"
        >
          −
        </button>
        <span className="w-6 text-center font-bold text-foreground text-sm">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-6 h-6 flex items-center justify-center bg-background border border-border rounded text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-bold cursor-pointer"
        >
          +
        </button>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="p-1 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
        title="Remove item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
