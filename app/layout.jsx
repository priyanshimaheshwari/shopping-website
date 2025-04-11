import { CartProvider } from "../context/CartContext"
import { ToastProvider } from "../context/ToastContext"
import "../styles/globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ShopEase - Online Shopping</title>
        <meta name="description" content="Shop the latest products with ShopEase" />
      </head>
      <body>
        <ToastProvider>
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
