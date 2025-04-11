"use client"

import { useEffect, useState } from "react"
import "../styles/Toast.css"

export default function Toast({ message, type = "success", duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        onClose && onClose()
      }, 300) // Wait for fade out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`toast ${type} ${visible ? "visible" : ""}`}>
      <div className="toast-message">{message}</div>
    </div>
  )
}
