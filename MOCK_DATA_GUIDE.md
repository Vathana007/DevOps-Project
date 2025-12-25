# Mock Data Guide for Frontend

This guide explains how to use the mock data that matches the Laravel backend API structure.

## 📁 Location

All mock data is located in: `lib/mock-data/`

## 🎯 What's Included

### 1. **products.ts**

- 30 realistic products across multiple categories
- Matches backend Product model structure exactly
- Includes: Electronics, Office Supplies, Audio, Furniture, Power & Charging, etc.

### 2. **orders.ts**

- 12 sample orders with different statuses
- Demonstrates all order states: pending, paid, completed, canceled
- Includes single and multi-item orders
- Customer information and receipts

### 3. **api-responses.ts**

- Complete mock API functions matching Laravel backend endpoints
- Simulated network delays for realistic testing
- Full CRUD operations for products and orders
- Error handling matching Laravel validation

### 4. **index.ts**

- Main export file with usage instructions

## 🚀 Usage Examples

### Product Operations

```typescript
import { mockProductsAPI, type Product } from "@/lib/mock-data";

// Get all products (sorted by ID DESC like backend)
const products = await mockProductsAPI.getAll();

// Get single product
const product = await mockProductsAPI.getById(1);

// Create new product
const newProduct = await mockProductsAPI.create({
  name: "New Product",
  description: "Product description",
  price: 99.99,
  stock: 50,
});

// Update product
const updated = await mockProductsAPI.update(1, {
  name: "Updated Name",
  price: 89.99,
});

// Delete product
const success = await mockProductsAPI.delete(1);
```

### Order Operations

```typescript
import { mockOrdersAPI, type Order, type OrderReceipt } from "@/lib/mock-data";

// Get all orders (sorted by ID DESC like backend)
const orders = await mockOrdersAPI.getAll();

// Get single order with receipt
const orderWithReceipt = await mockOrdersAPI.getById(1);

// Get receipt by order number
const receipt = await mockOrdersAPI.getReceiptByNumber(
  "ORD-20251220-093015-A1B2"
);

// Create new order
const newOrder = await mockOrdersAPI.create({
  customer_name: "John Doe",
  customer_email: "john@example.com",
  items: [
    { product_id: 1, quantity: 2 },
    { product_id: 5, quantity: 1 },
  ],
  tax: 15.5, // Optional, defaults to 10% of subtotal
});

// Update order status
const updated = await mockOrdersAPI.updateStatus(1, "completed");

// Cancel order
const canceled = await mockOrdersAPI.cancel(1);
```

### Using in React Components

```typescript
"use client";

import { useEffect, useState } from "react";
import { mockProductsAPI, type Product } from "@/lib/mock-data";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await mockProductsAPI.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p className="font-bold">${product.price}</p>
          <p className="text-sm">Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using in Server Components (Next.js)

```typescript
import { mockProductsAPI } from "@/lib/mock-data";

export default async function ProductsPage() {
  const products = await mockProductsAPI.getAll();

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p className="font-bold">${product.price}</p>
          <p className="text-sm">Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}
```

## 📊 Data Structure

### Product Interface

```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // Formatted as decimal string "29.99"
  stock: number;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
}
```

### Order Interface

```typescript
interface Order {
  id: number;
  order_number: string; // Format: ORD-YYYYMMDD-HHmmss-XXXX
  customer_name: string;
  customer_email: string;
  items: OrderItem[];
  subtotal: string; // Formatted as decimal string "299.99"
  tax: string;
  total: string;
  status: "pending" | "paid" | "completed" | "canceled";
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  product_id: number;
  name: string;
  price: string;
  quantity: number;
  line_total: string;
}

interface OrderReceipt {
  order: Order;
  receipt: {
    order_number: string;
    date: string;
    customer_name: string;
    customer_email: string;
    items: OrderItem[];
    subtotal: string;
    tax: string;
    total: string;
    status: OrderStatus;
  };
}
```

## 🔄 Switching to Real Backend

When you're ready to connect to the real backend, simply:

1. Create an API client that uses the same function signatures:

```typescript
// lib/api/products.ts
const API_URL = "http://localhost:8000/api";

export const productsAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },

  getById: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },

  // ... other methods
};
```

2. Replace imports:

```typescript
// Before (mock)
import { mockProductsAPI } from "@/lib/mock-data";

// After (real API)
import { productsAPI } from "@/lib/api/products";
```

## 🎨 Sample Data Highlights

### Products (30 total)

- Wireless Mouse ($29.99) - 150 in stock
- Mechanical Keyboard ($89.99) - 75 in stock
- Office Chair ($249.99) - 30 in stock
- Bluetooth Headphones ($129.99) - 90 in stock
- And 26 more realistic products...

### Orders (12 total)

- **Completed orders**: Alice's office setup ($685.83)
- **Pending orders**: Karen's smart watch order ($47.48)
- **Paid orders**: Carol's home office upgrade ($366.47)
- **Canceled orders**: Lisa's tablet order (canceled, $81.58)
- Large corporate order: TechStart Inc ($7,649.50)

## ⚙️ Features

✅ **Realistic Data**: Based on actual POS system patterns  
✅ **Network Delay Simulation**: 300-500ms delays for realistic UX testing  
✅ **Backend Match**: 100% matches Laravel backend structure  
✅ **Auto-calculations**: Subtotal, tax, total automatically computed  
✅ **Order Numbers**: Auto-generated in backend format  
✅ **Receipt Generation**: Automatic receipt creation like backend  
✅ **TypeScript Support**: Full type definitions included  
✅ **Error Handling**: Mock API errors for testing edge cases

## 🧪 Testing Edge Cases

```typescript
// Test product not found
const product = await mockProductsAPI.getById(9999); // Returns null

// Test order creation with invalid product
try {
  await mockOrdersAPI.create({
    customer_name: "Test",
    customer_email: "test@example.com",
    items: [{ product_id: 9999, quantity: 1 }],
  });
} catch (error) {
  console.error("Product not found"); // Will throw error
}

// Test different order statuses
const pendingOrders = orders.filter((o) => o.status === "pending");
const completedOrders = orders.filter((o) => o.status === "completed");
```

## 📝 Notes

- All prices are stored as strings with 2 decimal places (matches backend)
- Products are sorted by ID DESC (newest first) matching backend behavior
- Order numbers follow exact backend format: `ORD-YYYYMMDD-HHmmss-XXXX`
- Tax calculation defaults to 10% but can be overridden
- Stock levels are NOT automatically decremented in mock (backend handles this)
- Timestamps use ISO 8601 format matching Laravel's Carbon

## 🔗 Related Documentation

For backend API details, see:

- `../pos-backend/FRONTEND_INTEGRATION_GUIDE.md` - Complete API documentation
- `../pos-backend/API_REFERENCE.md` - Quick endpoint reference
- `../pos-backend/ESSENTIAL_INFO.md` - One-page overview

Happy coding! 🚀
