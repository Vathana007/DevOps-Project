// API Configuration
const API_BASE_URL = "https://dev-pos-backend-production.up.railway.app";
const AUTH_BASE_URL = "https://dev-authentication-production.up.railway.app";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image?: string;
  brand?: string;
  specs?: string;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  product_name?: string;
  unit_price?: string;
  subtotal?: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  items: OrderItem[];
  subtotal: string;
  tax: string;
  total: string;
  status: string;
}

export interface OrderReceipt {
  order_number: string;
  customer_name: string;
  items: {
    product_name: string;
    quantity: number;
    unit_price: string;
    subtotal: string;
  }[];
  subtotal: string;
  tax: string;
  total: string;
  status: string;
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for fresh data
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    if (error.message.includes("fetch") || error.name === "TypeError") {
      throw new Error("Unable to connect to server. Please check your connection or contact support.");
    }
    throw error;
  }
}

// Fetch a single product by ID
export async function getProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Error fetching product ${id}:`, error);
    if (error.message.includes("fetch") || error.name === "TypeError") {
      throw new Error("Unable to connect to server. Please check your connection or contact support.");
    }
    throw error;
  }
}

// Fetch all orders
export async function getOrders(): Promise<Order[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch orders: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    if (error.message.includes("fetch") || error.name === "TypeError") {
      throw new Error("Unable to connect to server. Please check your connection or contact support.");
    }
    throw error;
  }
}

// Fetch order receipt by order number
export async function getOrderReceipt(
  orderNumber: string
): Promise<OrderReceipt> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/orders/${orderNumber}/receipt`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch order receipt: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Error fetching receipt for order ${orderNumber}:`, error);
    if (error.message.includes("fetch") || error.name === "TypeError") {
      throw new Error("Unable to connect to server. Please check your connection or contact support.");
    }
    throw error;
  }
}

// Authentication interfaces
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user?: {
    id: number;
    email: string;
    name?: string;
  };
  message?: string;
}

// Register new user
export async function register(
  credentials: AuthCredentials
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Handle non-JSON responses (like CORS errors)
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: "Server returned non-JSON response" };
    }

    if (!response.ok) {
      throw new Error(
        data.message || `Registration failed: ${response.status}`
      );
    }

    return data;
  } catch (error: any) {
    console.error("Error registering user:", error);
    // Preserve the original error message for better debugging
    if (error.message.includes("fetch")) {
      throw new Error(
        "Failed to fetch - Please check if the authentication server is accessible"
      );
    }
    throw error;
  }
}

// Login user
export async function login(
  credentials: AuthCredentials
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Handle non-JSON responses (like CORS errors)
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: "Server returned non-JSON response" };
    }

    if (!response.ok) {
      throw new Error(data.message || `Login failed: ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.error("Error logging in:", error);
    // Preserve the original error message for better debugging
    if (error.message.includes("fetch")) {
      throw new Error(
        "Failed to fetch - Please check if the authentication server is accessible"
      );
    }
    throw error;
  }
}
