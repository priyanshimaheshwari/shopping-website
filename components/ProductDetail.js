"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Star, ShoppingCart, Heart } from "lucide-react"
import Header from "@/components/Header"
import { useCart } from "@/context/CartContext"

export default function ProductDetail({ id }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { addToCart, cartItems } = useCart()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)

        if (!response.ok) {
          throw new Error("Product not found")
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, router])

  const handleAddToCart = () => {
    addToCart(product)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header cartItemCount={cartItems?.reduce((total, item) => total + item.quantity, 0)} />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header cartItemCount={cartItems?.reduce((total, item) => total + item.quantity, 0)} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">Error: {error}</h1>
            <button
              onClick={() => router.push("/products")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-emerald-500"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItems?.reduce((total, item) => total + item.quantity, 0)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => router.push("/products")}
          className="mb-6 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer"
        >
          ← Back to Products
        </button>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-100">
              <div className="relative h-64 w-64 md:h-96 md:w-96">
                <Image
                  src={product?.image || "/placeholder.svg"}
                  alt={product?.title || "Product image"}
                  layout="fill"
                  objectFit="contain"
                  className="p-4"
                />
              </div>
            </div>

            <div className="md:w-1/2 p-6 md:p-8">
              <div className="uppercase tracking-wide text-sm text-emerald-500 font-semibold">{product.category}</div>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{product.title}</h1>

              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating?.rate) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating?.rate} ({product.rating?.count} reviews)
                </span>
              </div>

              <div className="mt-4 text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="h-5 w-5 cursor-pointer" />
                  Add to Cart
                </button>

                
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
