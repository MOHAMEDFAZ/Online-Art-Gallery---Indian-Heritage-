import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get('sort') || 'likes-desc'
    
    // Parse sort parameter
    let orderBy: any = { createdAt: "asc" }
    
    switch (sortBy) {
      case 'likes-desc':
        orderBy = { likes: { _count: 'desc' } }
        break
      case 'likes-asc':
        orderBy = { likes: { _count: 'asc' } }
        break
      case 'title-asc':
        orderBy = { title: 'asc' }
        break
      case 'title-desc':
        orderBy = { title: 'desc' }
        break
      case 'artist-asc':
        orderBy = { artist: 'asc' }
        break
      case 'artist-desc':
        orderBy = { artist: 'desc' }
        break
      case 'period-asc':
        orderBy = { period: 'asc' }
        break
      case 'period-desc':
        orderBy = { period: 'desc' }
        break
      case 'category-asc':
        orderBy = { category: 'asc' }
        break
      case 'category-desc':
        orderBy = { category: 'desc' }
        break
      default:
        orderBy = { createdAt: "asc" }
    }

    const artworks = await prisma.artwork.findMany({
      orderBy,
      include: { _count: { select: { likes: true } } },
      take: 50,
    })

    const data = artworks.map((a) => ({
      id: a.id,
      title: a.title,
      artist: a.artist,
      period: a.period,
      category: a.category,
      description: a.description,
      image_url: a.imageUrl,
      year_created: a.yearCreated ?? undefined,
      medium: a.medium ?? undefined,
      dimensions: a.dimensions ?? undefined,
      location: a.location ?? undefined,
      cultural_significance: a.significance ?? undefined,
      likeCount: a._count.likes,
    }))

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to load artworks" }, { status: 500 })
  }
}


