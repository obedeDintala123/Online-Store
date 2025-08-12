import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {

  const parts = params.slug.split("-");
  const id = Number(parts[parts.length - 1]); 

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
  }

   return NextResponse.json(product);
}
