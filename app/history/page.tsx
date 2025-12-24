"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { History as HistoryIcon, Search, Calendar, DollarSign, User, Package } from "lucide-react"

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
]

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredOrders, setFilteredOrders] = useState(mockOrders)

  const handleSearch = () => {
    const filtered = mockOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredOrders(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400"
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
      case "cancelled":
        return "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <HistoryIcon className="h-8 w-8" />
            Order History
          </h1>
          <p className="text-muted-foreground mt-2">View all customer orders and transactions</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="flex-1 space-y-2">
                <Label htmlFor="search">Search Orders</Label>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    placeholder="Search by order ID or customer name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button onClick={handleSearch}>
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <HistoryIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No orders found</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        Order #{order.id}
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {order.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {order.customer}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-primary flex items-center gap-1">
                        <DollarSign className="h-5 w-5" />
                        {order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold flex items-center gap-1 text-muted-foreground">
                      <Package className="h-4 w-4" />
                      Items:
                    </p>
                    <div className="space-y-2 pl-5">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm border-l-2 border-border pl-3 py-1"
                        >
                          <span>
                            {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                          </span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
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
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{filteredOrders.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  ${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {filteredOrders.filter((o) => o.status === "completed").length}
                </p>
                <p className="text-sm text-muted-foreground">Completed Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
