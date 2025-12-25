"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Package2 } from "lucide-react";
import { createProduct } from "@/lib/api";

export default function CreateItemPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(event.currentTarget);
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      stock: parseInt(formData.get("stock") as string, 10),
    };

    try {
      await createProduct(productData);
      setSuccess(true);
      
      // Reset form
      (event.target as HTMLFormElement).reset();
      
      // Redirect to home page after 1.5 seconds
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      console.error("Error creating product:", err);
      setError(err.message || "Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Package2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Create New Product</h1>
              <p className="text-sm text-muted-foreground">
                Add a new item to your inventory
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>
              Enter the information for the new product
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-sm text-green-600 dark:text-green-400">
                Product created successfully! Redirecting...
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., iPhone 15 Pro Max"
                  required
                  disabled={loading || success}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="999.99"
                    required
                    disabled={loading || success}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="100"
                    required
                    disabled={loading || success}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description..."
                  rows={4}
                  className="resize-none"
                  disabled={loading || success}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1" disabled={loading || success}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {loading ? "Creating..." : success ? "Created!" : "Create Product"}
                </Button>
                <Button type="reset" variant="outline" disabled={loading || success}>
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
