"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Receipt,
  Search,
  Clock,
  DollarSign,
  User,
  ShoppingBag,
} from "lucide-react";

// Mock order history data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2025-12-24 10:30 AM",
    customer: "John Doe",
    items: [
      { name: "iPhone 15 Pro", quantity: 1, price: 999 },
      { name: "AirPods Pro", quantity: 2, price: 249 },
    ],
    total: 1497,
    status: "completed",
  },
  {
    id: "ORD-002",
    date: "2025-12-24 11:15 AM",
    customer: "Jane Smith",
    items: [
      { name: "Samsung Galaxy S24", quantity: 1, price: 899 },
      { name: "Phone Case", quantity: 1, price: 29 },
    ],
    total: 928,
    status: "completed",
  },
  {
    id: "ORD-003",
    date: "2025-12-24 02:45 PM",
    customer: "Mike Johnson",
    items: [
      { name: "Google Pixel 8", quantity: 1, price: 699 },
      { name: "Screen Protector", quantity: 2, price: 15 },
    ],
    total: 729,
    status: "pending",
  },
  {
    id: "ORD-004",
    date: "2025-12-23 04:20 PM",
    customer: "Sarah Williams",
    items: [
      { name: "OnePlus 12", quantity: 1, price: 799 },
      { name: "Wireless Charger", quantity: 1, price: 49 },
    ],
    total: 848,
    status: "completed",
  },
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);

  const handleSearch = () => {
    const filtered = mockOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Order History</h1>
              <p className="text-sm text-muted-foreground">
                View and manage all customer transactions
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex gap-2">
          <Input
            placeholder="Search by order ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="max-w-md"
          />
          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Receipt className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No orders found</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">
                          Order #{order.id}
                        </CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {order.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {order.customer}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <ShoppingBag className="h-4 w-4" />
                      Items
                    </div>
                    <div className="space-y-1.5">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.name}{" "}
                            <span className="text-muted-foreground">
                              ×{item.quantity}
                            </span>
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {filteredOrders.length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Total Orders
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  $
                  {filteredOrders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Total Revenue
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {
                    filteredOrders.filter((o) => o.status === "completed")
                      .length
                  }
                </div>
                <p className="text-sm text-muted-foreground mt-1">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
