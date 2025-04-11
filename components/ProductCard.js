"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative h-48 flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            style={{ objectFit: "cover" }} 
            className="p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{product.title}</h3>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating.rate) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">({product.rating.count})</span>
          </div>

          <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>

            <button
              onClick={handleAddToCart}
              className="p-2 bg-emerald-100 rounded-full text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors duration-300"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
