import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Lista produtos ou busca por ID
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  }

  // Sem ID → lista todos
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

// POST: Cria produto
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, slug, description, imageUrl, category, price, quantity } = body;

  if (!name || !imageUrl || !category || price == null) {
    return NextResponse.json(
      { error: "Campos obrigatórios faltando" },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      imageUrl,
      category,
      price,
      quantity: quantity ?? 0,
      inStock: (quantity ?? 0) > 0,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
