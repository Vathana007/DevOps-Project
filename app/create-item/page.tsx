"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Package } from "lucide-react"

export default function CreateItemPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    // Simulate item creation
    setTimeout(() => {
      setLoading(false)
      alert("Item created successfully!")
      ;(event.target as HTMLFormElement).reset()
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Create New Item</h1>
          <p className="text-muted-foreground mt-2">Add a new product to your inventory</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Information
            </CardTitle>
            <CardDescription>Fill in the details to add a new item to your catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" placeholder="iPhone 15 Pro Max" required />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="999.99"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" name="stock" type="number" min="0" placeholder="100" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" placeholder="Smartphones" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Creating..." : "Create Item"}
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button type="reset" variant="outline" disabled={loading}>
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
