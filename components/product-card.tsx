"use client"

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col cursor-pointer">
      <div className="relative h-48 w-full bg-secondary overflow-hidden">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
          ${product.price}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>
          <h3 className="font-bold text-foreground mt-1 text-sm leading-tight">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-2">{product.specs}</p>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
