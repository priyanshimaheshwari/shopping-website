// app/layout.js (or layout.tsx if you're using TypeScript)
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Your Site",
  description: "Description here",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
