"use client";

import { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col cursor-pointer">
      <div className="relative h-48 w-full bg-secondary overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
          ${product.price}
        </div>
        {product.stock !== undefined && (
          <div className="absolute top-3 left-3 bg-card border border-border px-2 py-1 rounded text-xs">
            Stock: {product.stock}
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          {product.brand && (
            <p className="text-xs text-muted-foreground font-medium">
              {product.brand}
            </p>
          )}
          <h3 className="font-bold text-foreground mt-1 text-sm leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-2">
            {product.description || product.specs}
          </p>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className={`mt-4 w-full py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer ${
            product.stock === 0
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
