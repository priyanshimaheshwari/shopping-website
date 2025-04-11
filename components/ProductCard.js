"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "../context/CartContext"
import Image from "next/image"
import { useToast } from "../context/ToastContext"
import "../styles/ProductCard.css"

export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    showToast(`${product.title} added to cart!`, "success")
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="product-card">
        <div className="product-image-container">
          {!imageLoaded && <div className="spinner"></div>}
          <Image
            src={product.image}
            alt={product.title}
            className="product-image"
            style={{ display: imageLoaded ? "block" : "none" }}
            onLoadingComplete={() => setImageLoaded(true)}
            width={100} // Adjust width as needed
            height={100} // Adjust height as needed
          />
        </div>

        <div className="product-content">
          <div className="product-category">{product.category}</div>
          <h3 className="product-title">{product.title}</h3>

          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={i < Math.round(product.rating.rate) ? "currentColor" : "none"}
                  stroke="currentColor"
                  className={`star ${i < Math.round(product.rating.rate) ? "star-filled" : "star-empty"}`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
            </div>
            <span className="rating-count">({product.rating.count})</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-footer">
            <span className="product-price">${product.price.toFixed(2)}</span>

            <button onClick={handleAddToCart} className="add-to-cart-button" aria-label="Add to cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
