"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, Menu, X, LogOut, Home } from "lucide-react"

export default function Header({ cartItemCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/products" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-emerald-600">ShopEase</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/products"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
            >
              <Home className="h-5 w-5 mr-1" />
              Home
            </Link>

            <Link
              href="/cart"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5 mr-1" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              Cart
            </Link>

            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>

          <div className="flex items-center sm:hidden">
            <Link href="/cart" className="text-gray-500 hover:text-gray-900 px-3 py-2 relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/products"
              className="text-gray-500 hover:text-gray-900 block px-3 py-2 text-base font-medium border-l-4 border-transparent hover:border-emerald-500"
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Home
              </div>
            </Link>

            <Link
              href="/cart"
              className="text-gray-500 hover:text-gray-900 block px-3 py-2 text-base font-medium border-l-4 border-transparent hover:border-emerald-500"
            >
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-900 block px-3 py-2 text-base font-medium border-l-4 border-transparent hover:border-emerald-500 w-full text-left"
            >
              <div className="flex items-center">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
