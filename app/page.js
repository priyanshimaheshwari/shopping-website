"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import "../styles/Home.css"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/products")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <main className="home-container">
      <div className="loading-content">
        <h1 className="loading-title">Loading...</h1>
        <div className="spinner"></div>
      </div>
    </main>
  )
}
