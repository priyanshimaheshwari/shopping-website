"use client"

import { useParams, useRouter } from "next/navigation" // 👈 add useParams
import { useState, useEffect } from "react"
import Header from "../../../components/Header"
import { useCart } from "../../../context/CartContext"
import { useToast } from "../../../context/ToastContext"
import "../../../styles/ProductDetail.css"

export default function ProductDetail() {
  const { id } = useParams() // 👈 get id here
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const router = useRouter()
  const { addToCart, cartItems } = useCart()
  const { showToast } = useToast()


  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
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
    showToast(`${product.title} added to cart!`, "success")
  }

  if (loading) {
    return (
      <div className="product-detail-container">
        <Header cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <Header cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
        <div className="error-container">
          <h1 className="error-title">Error: {error}</h1>
          <button onClick={() => router.push("/products")} className="back-button">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="product-detail-container">
      <Header cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

      <main className="product-detail-main">
        <button onClick={() => router.push("/products")} className="back-button">
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
            className="back-icon"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Products
        </button>

        <div className="product-detail-card">
          <div className="product-detail-content">
            <div className="product-detail-image">
              {!imageLoaded && <div className="spinner"></div>}
              <div className="product-image-wrapper">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="product-img"
                  style={{ display: imageLoaded ? "block" : "none" }}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            <div className="product-detail-info">
              <div className="product-category">{product.category}</div>

              <h1 className="product-title">{product.title}</h1>

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
                <span className="rating-text">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              <div className="product-price">${product.price.toFixed(2)}</div>

              <div className="product-description-section">
                <h3 className="description-title">Description</h3>
                <p className="product-description">{product.description}</p>
              </div>

              <div className="product-actions">
                <button onClick={handleAddToCart} className="add-to-cart-button">
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
                    className="cart-icon"
                  >
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
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
