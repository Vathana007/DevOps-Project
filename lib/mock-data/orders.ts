// Mock order data matching the backend API structure
export type OrderStatus = "pending" | "paid" | "completed" | "canceled";

export interface OrderItem {
  product_id: number;
  name: string;
  price: string;
  quantity: number;
  line_total: string;
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
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export interface OrderReceipt {
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

export const mockOrders: Order[] = [
  {
    id: 1,
    order_number: "ORD-20251220-093015-A1B2",
    customer_name: "Alice Johnson",
    customer_email: "alice.johnson@example.com",
    items: [
      {
        product_id: 1,
        name: "Wireless Mouse",
        price: "29.99",
        quantity: 2,
        line_total: "59.98",
      },
      {
        product_id: 2,
        name: "Mechanical Keyboard",
        price: "89.99",
        quantity: 2,
        line_total: "179.98",
      },
      {
        product_id: 11,
        name: 'Monitor 24"',
        price: "189.99",
        quantity: 2,
        line_total: "379.98",
      },
    ],
    subtotal: "619.94",
    tax: "65.89",
    total: "685.83",
    status: "completed",
    created_at: "2025-12-20T09:30:15.000000Z",
    updated_at: "2025-12-20T09:30:15.000000Z",
  },
  {
    id: 2,
    order_number: "ORD-20251220-103522-C3D4",
    customer_name: "Bob Martinez",
    customer_email: "bob.martinez@university.edu",
    items: [
      {
        product_id: 6,
        name: "Notebook A5",
        price: "12.99",
        quantity: 5,
        line_total: "64.95",
      },
      {
        product_id: 7,
        name: "Ballpoint Pen Set",
        price: "8.50",
        quantity: 3,
        line_total: "25.50",
      },
      {
        product_id: 13,
        name: "USB Flash Drive 64GB",
        price: "18.99",
        quantity: 1,
        line_total: "18.99",
      },
    ],
    subtotal: "109.44",
    tax: "10.15",
    total: "119.59",
    status: "completed",
    created_at: "2025-12-20T10:35:22.000000Z",
    updated_at: "2025-12-20T10:35:22.000000Z",
  },
  {
    id: 3,
    order_number: "ORD-20251221-141230-E5F6",
    customer_name: "Carol Thompson",
    customer_email: "carol.t@email.com",
    items: [
      {
        product_id: 21,
        name: "Office Chair",
        price: "249.99",
        quantity: 1,
        line_total: "249.99",
      },
      {
        product_id: 5,
        name: "Laptop Stand",
        price: "35.00",
        quantity: 1,
        line_total: "35.00",
      },
      {
        product_id: 22,
        name: "Desk Lamp LED",
        price: "34.99",
        quantity: 1,
        line_total: "34.99",
      },
    ],
    subtotal: "319.98",
    tax: "46.49",
    total: "366.47",
    status: "paid",
    created_at: "2025-12-21T14:12:30.000000Z",
    updated_at: "2025-12-21T14:12:30.000000Z",
  },
  {
    id: 4,
    order_number: "ORD-20251221-152045-G7H8",
    customer_name: "David Chen",
    customer_email: "david.chen@techmail.com",
    items: [
      {
        product_id: 16,
        name: "Bluetooth Headphones",
        price: "129.99",
        quantity: 1,
        line_total: "129.99",
      },
      {
        product_id: 17,
        name: "USB Microphone",
        price: "99.99",
        quantity: 1,
        line_total: "99.99",
      },
      {
        product_id: 14,
        name: "External SSD 500GB",
        price: "79.99",
        quantity: 1,
        line_total: "79.99",
      },
      {
        product_id: 4,
        name: "Webcam HD",
        price: "69.99",
        quantity: 1,
        line_total: "69.99",
      },
    ],
    subtotal: "379.96",
    tax: "47.99",
    total: "427.95",
    status: "completed",
    created_at: "2025-12-21T15:20:45.000000Z",
    updated_at: "2025-12-21T15:20:45.000000Z",
  },
  {
    id: 5,
    order_number: "ORD-20251222-093300-I9J0",
    customer_name: "Eagle Corp Solutions",
    customer_email: "purchasing@eaglecorp.com",
    items: [
      {
        product_id: 7,
        name: "Ballpoint Pen Set",
        price: "8.50",
        quantity: 20,
        line_total: "170.00",
      },
      {
        product_id: 6,
        name: "Notebook A5",
        price: "12.99",
        quantity: 30,
        line_total: "389.70",
      },
      {
        product_id: 10,
        name: "Paper Clips Box",
        price: "5.99",
        quantity: 10,
        line_total: "59.90",
      },
    ],
    subtotal: "619.60",
    tax: "135.75",
    total: "755.35",
    status: "completed",
    created_at: "2025-12-22T09:33:00.000000Z",
    updated_at: "2025-12-22T09:33:00.000000Z",
  },
  {
    id: 6,
    order_number: "ORD-20251222-110815-K1L2",
    customer_name: "Frank Wilson",
    customer_email: "frank.gamer@email.com",
    items: [
      {
        product_id: 2,
        name: "Mechanical Keyboard",
        price: "89.99",
        quantity: 1,
        line_total: "89.99",
      },
      {
        product_id: 1,
        name: "Wireless Mouse",
        price: "29.99",
        quantity: 1,
        line_total: "29.99",
      },
      {
        product_id: 15,
        name: "Mouse Pad XL",
        price: "19.99",
        quantity: 1,
        line_total: "19.99",
      },
      {
        product_id: 16,
        name: "Bluetooth Headphones",
        price: "129.99",
        quantity: 1,
        line_total: "129.99",
      },
    ],
    subtotal: "269.96",
    tax: "35.99",
    total: "305.95",
    status: "paid",
    created_at: "2025-12-22T11:08:15.000000Z",
    updated_at: "2025-12-22T11:08:15.000000Z",
  },
  {
    id: 7,
    order_number: "ORD-20251222-143510-M3N4",
    customer_name: "Grace Lee",
    customer_email: "grace.lee@mobile.com",
    items: [
      {
        product_id: 27,
        name: "Wireless Charger",
        price: "24.99",
        quantity: 2,
        line_total: "49.98",
      },
      {
        product_id: 29,
        name: "Power Bank 20000mAh",
        price: "44.99",
        quantity: 1,
        line_total: "44.99",
      },
      {
        product_id: 18,
        name: "Earbuds Wireless",
        price: "59.99",
        quantity: 1,
        line_total: "59.99",
      },
    ],
    subtotal: "154.96",
    tax: "22.89",
    total: "177.85",
    status: "completed",
    created_at: "2025-12-22T14:35:10.000000Z",
    updated_at: "2025-12-22T14:35:10.000000Z",
  },
  {
    id: 8,
    order_number: "ORD-20251223-091545-O5P6",
    customer_name: "Henry Brown",
    customer_email: "h.brown@conference.com",
    items: [
      {
        product_id: 11,
        name: 'Monitor 24"',
        price: "189.99",
        quantity: 3,
        line_total: "569.97",
      },
      {
        product_id: 12,
        name: "HDMI Cable 2m",
        price: "12.50",
        quantity: 5,
        line_total: "62.50",
      },
      {
        product_id: 26,
        name: "Power Strip 6 Outlets",
        price: "32.99",
        quantity: 2,
        line_total: "65.98",
      },
      {
        product_id: 4,
        name: "Webcam HD",
        price: "69.99",
        quantity: 2,
        line_total: "139.98",
      },
    ],
    subtotal: "838.43",
    tax: "102.45",
    total: "940.88",
    status: "completed",
    created_at: "2025-12-23T09:15:45.000000Z",
    updated_at: "2025-12-23T09:15:45.000000Z",
  },
  {
    id: 9,
    order_number: "ORD-20251223-133020-Q7R8",
    customer_name: "Irene Davis",
    customer_email: "irene.d@homemail.com",
    items: [
      {
        product_id: 19,
        name: "Desktop Speakers",
        price: "39.99",
        quantity: 1,
        line_total: "39.99",
      },
      {
        product_id: 20,
        name: "Audio Cable 3.5mm",
        price: "7.99",
        quantity: 2,
        line_total: "15.98",
      },
      {
        product_id: 12,
        name: "HDMI Cable 2m",
        price: "12.50",
        quantity: 1,
        line_total: "12.50",
      },
    ],
    subtotal: "68.47",
    tax: "7.08",
    total: "75.55",
    status: "paid",
    created_at: "2025-12-23T13:30:20.000000Z",
    updated_at: "2025-12-23T13:30:20.000000Z",
  },
  {
    id: 10,
    order_number: "ORD-20251223-151200-S9T0",
    customer_name: "Jack Robinson",
    customer_email: "jack.freelance@work.com",
    items: [
      {
        product_id: 5,
        name: "Laptop Stand",
        price: "35.00",
        quantity: 1,
        line_total: "35.00",
      },
      {
        product_id: 22,
        name: "Desk Lamp LED",
        price: "34.99",
        quantity: 1,
        line_total: "34.99",
      },
      {
        product_id: 1,
        name: "Wireless Mouse",
        price: "29.99",
        quantity: 1,
        line_total: "29.99",
      },
      {
        product_id: 3,
        name: "USB-C Hub",
        price: "45.50",
        quantity: 1,
        line_total: "45.50",
      },
      {
        product_id: 8,
        name: "Desk Organizer",
        price: "24.99",
        quantity: 1,
        line_total: "24.99",
      },
    ],
    subtotal: "170.47",
    tax: "18.44",
    total: "188.91",
    status: "completed",
    created_at: "2025-12-23T15:12:00.000000Z",
    updated_at: "2025-12-23T15:12:00.000000Z",
  },
  {
    id: 11,
    order_number: "ORD-20251224-083545-U1V2",
    customer_name: "Karen White",
    customer_email: "karen.white@email.com",
    items: [
      {
        product_id: 27,
        name: "Wireless Charger",
        price: "24.99",
        quantity: 1,
        line_total: "24.99",
      },
    ],
    subtotal: "24.99",
    tax: "22.49",
    total: "47.48",
    status: "pending",
    created_at: "2025-12-24T08:35:45.000000Z",
    updated_at: "2025-12-24T08:35:45.000000Z",
  },
  {
    id: 12,
    order_number: "ORD-20251222-201530-Y5Z6",
    customer_name: "Lisa Anderson",
    customer_email: "lisa.a@email.com",
    items: [
      {
        product_id: 29,
        name: "Power Bank 20000mAh",
        price: "44.99",
        quantity: 1,
        line_total: "44.99",
      },
    ],
    subtotal: "44.99",
    tax: "36.59",
    total: "81.58",
    status: "canceled",
    created_at: "2025-12-22T20:15:30.000000Z",
    updated_at: "2025-12-22T20:15:30.000000Z",
  },
];
