"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../../components/Header"
import { useCart } from "../../context/CartContext"
import { useToast } from "../../context/ToastContext"
import "../../styles/Cart.css"
import Image from "next/image"

export default function Cart() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const { showToast } = useToast()

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
    showToast("Order placed successfully!", "success")

    // Hide confirmation after 4 seconds
    setTimeout(() => {
      setShowConfirmation(false)
    }, 4000)
  }

  const handleRemoveItem = (id, title) => {
    removeFromCart(id)
    showToast(`${title} removed from cart`, "info")
  }

  return (
    <div className="cart-container">
      <Header cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-icon-container">
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
                className="confirmation-icon"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </div>
            <h3 className="confirmation-title">Order placed successfully!</h3>
            <p className="confirmation-text">Thank you for your purchase. Your order has been received.</p>
          </div>
        </div>
      )}

      <main className="cart-main">
        <h1 className="cart-title">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon-container">
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
                className="empty-cart-icon"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </div>
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-text">Looks like you have added any products to your cart yet.</p>
            <button onClick={() => router.push("/products")} className="continue-shopping-button">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-image-container">
                  <Image
  src={item?.image ?? "/placeholder.svg"}
  alt={item?.title ?? "Product image"}
  width={100} // or any appropriate size
  height={100}
  className="cart-item-image"
  objectFit="contain"
/>

                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h3 className="cart-item-title">{item.title}</h3>
                      <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="cart-item-description">{item.description}</p>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="quantity-button"
                        >
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
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-button">
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
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>

                      <button onClick={() => handleRemoveItem(item.id, item.title)} className="remove-button">
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
                          className="remove-icon"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                        <span className="remove-text">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <div className="subtotal">
                <p>Subtotal</p>
                <p>${calculateTotal().toFixed(2)}</p>
              </div>
              <p className="shipping-text">Shipping and taxes calculated at checkout.</p>

              <button onClick={handleCheckout} className="checkout-button">
                Checkout
              </button>

              <div className="continue-shopping-link">
                <p>
                  or{" "}
                  <button type="button" onClick={() => router.push("/products")} className="continue-link">
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
