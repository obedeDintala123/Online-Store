import ProductClient from "./product-client";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  const slugParts = params.slug.split("-");
  const productId = slugParts[slugParts.length - 1];

  return <ProductClient productId={productId} />;
}
