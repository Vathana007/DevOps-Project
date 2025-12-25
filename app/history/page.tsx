"use client";

import { useState, useEffect } from "react";
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
  Eye,
} from "lucide-react";
import {
  getOrders,
  getOrderReceipt,
  type Order,
  type OrderReceipt,
} from "@/lib/api";

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<OrderReceipt | null>(
    null
  );
  const [loadingReceipt, setLoadingReceipt] = useState(false);

  // Fetch orders from API
  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const handleViewReceipt = async (orderNumber: string) => {
    try {
      setLoadingReceipt(true);
      const receipt = await getOrderReceipt(orderNumber);
      setSelectedReceipt(receipt);
    } catch (err) {
      console.error("Failed to load receipt:", err);
      alert("Failed to load receipt. Please try again.");
    } finally {
      setLoadingReceipt(false);
    }
  };

  const handleSearch = () => {
    const filtered = orders.filter(
      (order) =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
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
          {loading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">Loading orders...</p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-red-500">{error}</p>
              </CardContent>
            </Card>
          )}

          {!loading && !error && filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Receipt className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No orders found</p>
              </CardContent>
            </Card>
          ) : (
            !loading &&
            !error &&
            filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">
                          Order #{order.order_number}
                        </CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {order.customer_name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${parseFloat(order.total).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tax: ${parseFloat(order.tax).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <ShoppingBag className="h-4 w-4" />
                      Items ({order.items.length})
                    </div>
                    <div className="space-y-1.5">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            Product ID: {item.product_id}{" "}
                            <span className="text-muted-foreground">
                              ×{item.quantity}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-medium">
                          ${parseFloat(order.subtotal).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReceipt(order.order_number)}
                        disabled={loadingReceipt}
                        className="w-full"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {loadingReceipt
                          ? "Loading..."
                          : "View Detailed Receipt"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Receipt Modal */}
        {selectedReceipt && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedReceipt(null)}
          >
            <Card
              className="max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order Receipt</CardTitle>
                    <CardDescription>
                      Order #{selectedReceipt.order_number}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedReceipt(null)}
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="pb-4 border-b">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {selectedReceipt.customer_name}
                    </span>
                  </div>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedReceipt.status)}>
                      {selectedReceipt.status}
                    </Badge>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-semibold mb-3">Items</h3>
                  <div className="space-y-2">
                    {selectedReceipt.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${parseFloat(item.unit_price).toFixed(2)} ×{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">
                          ${parseFloat(item.subtotal).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>
                      ${parseFloat(selectedReceipt.subtotal).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax:</span>
                    <span>${parseFloat(selectedReceipt.tax).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-primary">
                      ${parseFloat(selectedReceipt.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Summary Stats */}
        {!loading && !error && (
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
                      .reduce((sum, order) => sum + parseFloat(order.total), 0)
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
                  <p className="text-sm text-muted-foreground mt-1">
                    Completed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
