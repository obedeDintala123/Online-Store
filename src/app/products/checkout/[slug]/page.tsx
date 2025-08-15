import { CheckOutForm } from "@/app/products/checkout/[slug]/checkout-form";

export default function CheckOutPage(props: { params: { slug: string } }) {
    const { slug } = props.params;
    const slugParts = slug.split("-");
    const productId = slugParts.at(-1) ?? "";

    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <CheckOutForm productId={productId} />;
        </div>
    )
}
