"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { SortControls, SortOption } from "@/components/sort-controls"

interface Artwork {
  id: string
  title: string
  artist: string
  period: string
  category: string
  description: string
  image_url: string
  year_created?: string
  medium?: string
  dimensions?: string
  location?: string
  cultural_significance?: string
}

export function FeaturedArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set())
  const [artworkLikes, setArtworkLikes] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [currentSort, setCurrentSort] = useState<SortOption>("likes-desc")

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/artworks?sort=${currentSort}`, { cache: "no-store" })
        const json = await res.json()
        const data: (Artwork & { likeCount?: number })[] = json.data || []
        setArtworks(data)
        const initialLikeCounts: Record<string, number> = {}
        for (const a of data) initialLikeCounts[a.id] = a.likeCount || 0
        setArtworkLikes(initialLikeCounts)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [currentSort])

  const handleLike = async (artworkId: string) => {
    const isLiked = likedArtworks.has(artworkId)
    const newLikedArtworks = new Set(likedArtworks)
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId, action: isLiked ? "dec" : "inc" }),
      })
      const json = await res.json()
      const serverCount = json.likeCount as number | undefined

      if (isLiked) {
        newLikedArtworks.delete(artworkId)
      } else {
        newLikedArtworks.add(artworkId)
      }

      setLikedArtworks(newLikedArtworks)
      setArtworkLikes((prev) => ({
        ...prev,
        [artworkId]: serverCount ?? (isLiked ? Math.max(0, (prev[artworkId] || 0) - 1) : (prev[artworkId] || 0) + 1),
      }))
    } catch (e) {
      console.error(e)
    }
  }

  const handleShare = async (artwork: Artwork) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: `Check out this beautiful artwork: ${artwork.title} by ${artwork.artist}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${artwork.title} - ${window.location.href}`)
      alert("Link copied to clipboard!")
    }
  }

  const handleViewDetails = (artwork: Artwork) => {
    const details = [
      `Title: ${artwork.title}`,
      `Artist: ${artwork.artist}`,
      `Period: ${artwork.period}`,
      `Category: ${artwork.category}`,
      artwork.year_created && `Year: ${artwork.year_created}`,
      artwork.medium && `Medium: ${artwork.medium}`,
      artwork.dimensions && `Dimensions: ${artwork.dimensions}`,
      artwork.location && `Location: ${artwork.location}`,
      "",
      artwork.description,
      "",
      artwork.cultural_significance && `Cultural Significance: ${artwork.cultural_significance}`,
    ]
      .filter(Boolean)
      .join("\n")

    alert(details)
  }

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort)
  }

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>Loading artworks...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-balance">Featured Masterpieces</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover some of the most celebrated works in Indian art history, each telling a unique story of our
            cultural heritage.
          </p>
        </div>

        <SortControls 
          currentSort={currentSort}
          onSortChange={handleSortChange}
          totalArtworks={artworks.length}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <Card
              key={artwork.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={artwork.image_url || "/placeholder.svg"}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {artwork.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{artwork.period}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-balance">{artwork.title}</h3>
                  <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                </div>

                <p className="text-sm text-pretty leading-relaxed">{artwork.description}</p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleLike(artwork.id)}>
                      <Heart
                        className={`h-4 w-4 mr-1 ${likedArtworks.has(artwork.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                      {artworkLikes[artwork.id] || 0}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleShare(artwork)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(artwork)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
