"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Header from "@/components/Header"
import { useCart } from "@/context/CartContext"

export default function Cart() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    clearCart()
    setShowConfirmation(true)

    // Hide confirmation after 4 seconds
    setTimeout(() => {
      setShowConfirmation(false)
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Order placed successfully!</h3>
              <p className="mt-2 text-sm text-gray-500">Thank you for your purchase. Your order has been received.</p>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-gray-500">Looks like you have not added any products to your cart yet.</p>
            <button
              onClick={() => router.push("/products")}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 relative w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      layout="fill"
                      objectFit="contain"
                      className="p-2"
                    />
                  </div>

                  <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                        <p className="ml-4 text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 flex items-center"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="ml-1 text-sm hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 p-4 sm:p-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${calculateTotal().toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-emerald-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-4 flex justify-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="text-emerald-600 font-medium hover:text-emerald-500"
                    onClick={() => router.push("/products")}
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
