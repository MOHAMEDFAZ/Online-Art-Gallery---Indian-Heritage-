"use client"

import { SortControls, SortOption } from "@/components/sort-controls"
import { useRouter, useSearchParams } from "next/navigation"

interface DbExplorerClientProps {
  currentSort: SortOption
  totalArtworks: number
}

export function DbExplorerClient({ currentSort, totalArtworks }: DbExplorerClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sort)
    router.push(`/db?${params.toString()}`)
  }

  return (
    <SortControls 
      currentSort={currentSort}
      onSortChange={handleSortChange}
      totalArtworks={totalArtworks}
    />
  )
}





