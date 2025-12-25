// Mock API response helpers matching the Laravel backend structure
import { mockProducts, type Product } from "./products";
import { mockOrders, type Order, type OrderReceipt } from "./orders";

// Simulate API delay
export const simulateDelay = (ms: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Products API Mock Responses
export const mockProductsAPI = {
  // GET /api/products - Get all products
  getAll: async (): Promise<Product[]> => {
    await simulateDelay();
    return [...mockProducts].sort((a, b) => b.id - a.id); // Order by ID DESC like backend
  },

  // GET /api/products/{id} - Get single product
  getById: async (id: number): Promise<Product | null> => {
    await simulateDelay();
    return mockProducts.find((p) => p.id === id) || null;
  },

  // POST /api/products - Create new product
  create: async (data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
  }): Promise<Product> => {
    await simulateDelay();
    const newProduct: Product = {
      id: Math.max(...mockProducts.map((p) => p.id)) + 1,
      name: data.name,
      description: data.description || "",
      price: data.price.toFixed(2),
      stock: data.stock,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  // PUT /api/products/{id} - Update product
  update: async (
    id: number,
    data: {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
    }
  ): Promise<Product | null> => {
    await simulateDelay();
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) return null;

    mockProducts[index] = {
      ...mockProducts[index],
      ...(data.name && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.price && { price: data.price.toFixed(2) }),
      ...(data.stock !== undefined && { stock: data.stock }),
      updated_at: new Date().toISOString(),
    };
    return mockProducts[index];
  },

  // DELETE /api/products/{id} - Delete product
  delete: async (id: number): Promise<boolean> => {
    await simulateDelay();
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) return false;
    mockProducts.splice(index, 1);
    return true;
  },
};

// Orders API Mock Responses
export const mockOrdersAPI = {
  // GET /api/orders - Get all orders
  getAll: async (): Promise<Order[]> => {
    await simulateDelay();
    return [...mockOrders].sort((a, b) => b.id - a.id); // Order by ID DESC like backend
  },

  // GET /api/orders/{id} - Get single order with receipt
  getById: async (id: number): Promise<OrderReceipt | null> => {
    await simulateDelay();
    const order = mockOrders.find((o) => o.id === id);
    if (!order) return null;

    return {
      order,
      receipt: {
        order_number: order.order_number,
        date: order.created_at,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        items: order.items,
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        status: order.status,
      },
    };
  },

  // GET /api/orders/receipt/{order_number} - Get receipt by order number
  getReceiptByNumber: async (
    orderNumber: string
  ): Promise<OrderReceipt | null> => {
    await simulateDelay();
    const order = mockOrders.find((o) => o.order_number === orderNumber);
    if (!order) return null;

    return {
      order,
      receipt: {
        order_number: order.order_number,
        date: order.created_at,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        items: order.items,
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        status: order.status,
      },
    };
  },

  // POST /api/orders - Create new order
  create: async (data: {
    customer_name: string;
    customer_email: string;
    items: { product_id: number; quantity: number }[];
    tax?: number;
  }): Promise<OrderReceipt> => {
    await simulateDelay(500); // Longer delay for order creation

    // Calculate order details
    const lineItems = data.items.map((item) => {
      const product = mockProducts.find((p) => p.id === item.product_id);
      if (!product) throw new Error(`Product ${item.product_id} not found`);

      const price = parseFloat(product.price);
      const lineTotal = price * item.quantity;

      return {
        product_id: product.id,
        name: product.name,
        price: price.toFixed(2),
        quantity: item.quantity,
        line_total: lineTotal.toFixed(2),
      };
    });

    const subtotal = lineItems.reduce(
      (sum, item) => sum + parseFloat(item.line_total),
      0
    );
    const tax = data.tax || subtotal * 0.1; // 10% tax if not provided
    const total = subtotal + tax;

    // Generate order number (backend format: ORD-YYYYMMDD-HHmmss-XXXX)
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, "");
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `ORD-${dateStr}-${timeStr}-${random}`;

    const newOrder: Order = {
      id: Math.max(...mockOrders.map((o) => o.id)) + 1,
      order_number: orderNumber,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      items: lineItems,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      status: "pending",
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };

    mockOrders.push(newOrder);

    return {
      order: newOrder,
      receipt: {
        order_number: newOrder.order_number,
        date: newOrder.created_at,
        customer_name: newOrder.customer_name,
        customer_email: newOrder.customer_email,
        items: newOrder.items,
        subtotal: newOrder.subtotal,
        tax: newOrder.tax,
        total: newOrder.total,
        status: newOrder.status,
      },
    };
  },

  // PUT /api/orders/{id}/status - Update order status
  updateStatus: async (
    id: number,
    status: "pending" | "paid" | "completed" | "canceled"
  ): Promise<Order | null> => {
    await simulateDelay();
    const index = mockOrders.findIndex((o) => o.id === id);
    if (index === -1) return null;

    mockOrders[index] = {
      ...mockOrders[index],
      status,
      updated_at: new Date().toISOString(),
    };
    return mockOrders[index];
  },

  // POST /api/orders/{id}/cancel - Cancel order
  cancel: async (id: number): Promise<Order | null> => {
    await simulateDelay();
    const index = mockOrders.findIndex((o) => o.id === id);
    if (index === -1) return null;

    mockOrders[index] = {
      ...mockOrders[index],
      status: "canceled",
      updated_at: new Date().toISOString(),
    };
    return mockOrders[index];
  },
};

// API Error responses
export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}

export const mockAPIErrors = {
  notFound: () => new APIError(404, "Resource not found"),
  validationError: (errors: Record<string, string[]>) =>
    new APIError(422, JSON.stringify(errors)),
  serverError: () => new APIError(500, "Internal server error"),
};
