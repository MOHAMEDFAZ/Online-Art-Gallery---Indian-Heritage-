import { prisma } from "@/lib/db"
import { DbExplorerClient } from "@/components/db-explorer-client"
import { SortOption } from "@/components/sort-controls"

type SearchParams = {
  sort?: string
}

export default async function DbPage({ searchParams }: { searchParams: SearchParams }) {
  const sortBy = (searchParams.sort as SortOption) || "likes-desc"
  
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
  })

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl font-bold mb-6">DB Explorer</h1>
      <p className="text-muted-foreground mb-6">Direct Prisma query to SQLite database (server component).</p>
      
      <DbExplorerClient 
        currentSort={sortBy}
        totalArtworks={artworks.length}
      />
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Artist</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Period</th>
              <th className="text-left p-3">Likes</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.title}</td>
                <td className="p-3">{a.artist}</td>
                <td className="p-3">{a.category}</td>
                <td className="p-3">{a.period}</td>
                <td className="p-3">{a._count.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-sm text-muted-foreground">
        <p>Files demonstrating DBMS integration:</p>
        <ul className="list-disc ml-6">
          <li><code>prisma/schema.prisma</code> (SQLite schema)</li>
          <li><code>lib/db.ts</code> (Prisma client)</li>
          <li><code>app/api/artworks/route.ts</code> (API GET)</li>
          <li><code>app/api/likes/route.ts</code> (API POST)</li>
          <li><code>components/featured-artworks.tsx</code> (fetch UI)</li>
        </ul>
      </div>
    </main>
  )
}


