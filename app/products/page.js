"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../../components/Header"
import ProductCard from "../../components/ProductCard"
import { useCart } from "../../context/CartContext"
import "../../styles/Products.css"

export default function Products() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const router = useRouter()
  const { cartItems } = useCart()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories")
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchProducts()
    fetchCategories()
  }, [router])

  useEffect(() => {
    // Filter products based on search term and category
    let result = products

    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (product) => product.title.toLowerCase().includes(term) || product.description.toLowerCase().includes(term),
      )
    }

    setFilteredProducts(result)
  }, [searchTerm, selectedCategory, products])

  const handleCategoryChange = async (category) => {
    setLoading(true)
    setSelectedCategory(category)

    try {
      let url = "https://fakestoreapi.com/products"
      if (category) {
        url = `https://fakestoreapi.com/products/category/${category}`
      }

      const response = await fetch(url)
      const data = await response.json()
      setFilteredProducts(data)
    } catch (error) {
      console.error("Error fetching filtered products:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="products-container">
      <Header cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

      <main className="products-main">
        <div className="products-header">
          <h1 className="products-title">All Products</h1>

          <div className="filters-container">
            <div className="search-container">
              <span className="search-icon">
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-container">
              <span className="category-icon">
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
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="category-select"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">
            <p className="no-products-text">No products found.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
