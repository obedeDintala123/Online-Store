import ProductClient from "./product-client";

export default async function ProductPage(props: { params: { slug: string } }) {
  const { slug } = await props.params;
  const slugParts = slug.split("-");
  const productId = slugParts.at(-1) ?? "";

  return <ProductClient productId={productId} />;
}
