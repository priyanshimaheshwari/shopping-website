"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Header from "@/components/Header";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import "./ProductDetailPage.css"; 

export default function ProductDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const { addToCart, cartItems } = useCartStore();

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
  };

  return (
    <div className="product-detail-container">
      <Header cartItemCount={cartItems?.reduce((total, item) => total + item.quantity, 0)} />

      <main className="product-detail-main">
        <button onClick={() => router.push("/products")} className="back-button">
          ← Back to Products
        </button>

        <div className="product-card">
          <div className="product-image-section">
            <div className="product-image-wrapper">
              <Image
                src={product?.image }
                alt={product?.title || "Product image"}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <div className="product-info-section">
            <div className="product-category">{product?.category}</div>
            <h1 className="product-title">{product?.title}</h1>

            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`star-icon ${
                      i < Math.round(product?.rating?.rate) ? "star-filled" : "star-empty"
                    }`}
                  />
                ))}
              </div>
              <span className="rating-text">
                {product?.rating?.rate} ({product?.rating?.count} reviews)
              </span>
            </div>

            <div className="product-price">${product?.price?.toFixed(2)}</div>

            <div className="product-description-section">
              <h3 className="description-title">Description</h3>
              <p className="product-description">{product?.description}</p>
            </div>

            <div className="product-actions">
              <button onClick={handleAddToCart} className="cart-button">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
