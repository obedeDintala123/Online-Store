import ProductClient from "./product-client";
export default function ProductPage({ params }: { params: { slug: string } }) {
  const slugParts = params.slug.split("-");
  const productId = slugParts[slugParts.length - 1];

  return <ProductClient productId={productId} />;
}
