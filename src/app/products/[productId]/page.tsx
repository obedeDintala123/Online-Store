import ProductClient from "./product-client";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductClient productId={params.productId} />;
}
