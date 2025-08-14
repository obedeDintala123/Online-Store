import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type LoginSchema = z.infer<typeof loginSchema>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Dados inválidos", issues: result.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as Secret,
      { expiresIn: "1m" }
    );

    return NextResponse.json({
      message: "Login bem-sucedido",
      user: { id: user.id, email: user.email },
      token
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
