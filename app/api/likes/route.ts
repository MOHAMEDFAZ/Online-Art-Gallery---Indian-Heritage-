import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { artworkId, action } = await request.json()
    if (!artworkId || (action !== "inc" && action !== "dec")) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 })
    }

    if (action === "inc") {
      await prisma.like.create({ data: { artworkId } })
    } else {
      // Remove one like row if exists
      const one = await prisma.like.findFirst({ where: { artworkId } })
      if (one) await prisma.like.delete({ where: { id: one.id } })
    }

    const count = await prisma.like.count({ where: { artworkId } })
    return NextResponse.json({ artworkId, likeCount: count })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update like" }, { status: 500 })
  }
}


