import ProductClient from "./product-client";

export default async function ProductPage(props: { params: { slug: string } }) {
  const { slug } = await props.params; // força o Next a resolver se for promessa
  const slugParts = slug.split("-");
  const productId = slugParts.at(-1) ?? "";

  return <ProductClient productId={productId} />;
}
