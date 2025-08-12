import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categoryMap } from "@/lib/utils";

export async function GET(
  _req: Request,
  { params }: { params: { category: string } }
) {
  const { category } = params;

  if (!category) {
    return NextResponse.json({ error: "Categoria inválida!" }, { status: 400 });
  }

  const dbCategory = categoryMap[category] || category;

  const products = await prisma.product.findMany({
    where: { category: { equals: dbCategory, mode: "insensitive" } }
  });

  if (!products.length) {
    return NextResponse.json(
      { error: "Nenhum produto encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(products);
}
