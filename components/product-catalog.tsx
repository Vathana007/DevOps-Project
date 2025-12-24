"use client"

import { useState } from "react"
import ProductCard from "./product-card"
import SearchBar from "./search-bar"

const PHONES = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999,
    image: "/iphone-15-pro-hands.png",
    specs: '6.1" Display, 256GB',
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    price: 899,
    image: "/samsung-galaxy-s24.jpg",
    specs: '6.2" Display, 256GB',
  },
  {
    id: 3,
    name: "Google Pixel 8",
    brand: "Google",
    price: 799,
    image: "/google-pixel-8.png",
    specs: '6.2" Display, 128GB',
  },
  {
    id: 4,
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 749,
    image: "/oneplus-12-product-shot.png",
    specs: '6.7" Display, 256GB',
  },
  {
    id: 5,
    name: "iPhone 15",
    brand: "Apple",
    price: 799,
    image: "/iphone-15-hands.png",
    specs: '6.1" Display, 128GB',
  },
  {
    id: 6,
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    price: 449,
    image: "/samsung-galaxy-a55.png",
    specs: '6.4" Display, 128GB',
  },
  {
    id: 7,
    name: "Xiaomi 14",
    brand: "Xiaomi",
    price: 599,
    image: "/xiaomi-14-smartphone.png",
    specs: '6.4" Display, 256GB',
  },
  {
    id: 8,
    name: "Realme 12 Pro",
    brand: "Realme",
    price: 349,
    image: "/realme-12-pro.jpg",
    specs: '6.4" Display, 128GB',
  },
]

export default function ProductCatalog({ onAddToCart }) {
  const [search, setSearch] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("All")

  const brands = ["All", ...new Set(PHONES.map((p) => p.brand))]

  const filteredPhones = PHONES.filter((phone) => {
    const matchSearch =
      phone.name.toLowerCase().includes(search.toLowerCase()) ||
      phone.brand.toLowerCase().includes(search.toLowerCase())
    const matchBrand = selectedBrand === "All" || phone.brand === selectedBrand
    return matchSearch && matchBrand
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Available Phones</h2>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="flex gap-2 flex-wrap">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedBrand === brand
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:border-primary"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhones.map((phone) => (
          <ProductCard key={phone.id} product={phone} onAddToCart={onAddToCart} />
        ))}
      </div>

      {filteredPhones.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No phones found</p>
        </div>
      )}
    </div>
  )
}
