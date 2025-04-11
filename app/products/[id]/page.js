
import ProductDetail from "@/components/ProductDetail"

export default function ProductDetailPage({ params }) {
  const { id } = params
  return <ProductDetail id={id} />
}
