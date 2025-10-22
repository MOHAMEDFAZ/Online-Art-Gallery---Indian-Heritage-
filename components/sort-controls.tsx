"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Heart, User, Calendar, Tag } from "lucide-react"

export type SortOption = 
  | "likes-desc" 
  | "likes-asc" 
  | "title-asc" 
  | "title-desc" 
  | "artist-asc" 
  | "artist-desc" 
  | "period-asc" 
  | "period-desc" 
  | "category-asc" 
  | "category-desc"

interface SortControlsProps {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
  totalArtworks: number
}

const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: "likes-desc", label: "Most Liked", icon: <Heart className="h-4 w-4" /> },
  { value: "likes-asc", label: "Least Liked", icon: <Heart className="h-4 w-4" /> },
  { value: "title-asc", label: "Title A-Z", icon: <ArrowUpDown className="h-4 w-4" /> },
  { value: "title-desc", label: "Title Z-A", icon: <ArrowUpDown className="h-4 w-4" /> },
  { value: "artist-asc", label: "Artist A-Z", icon: <User className="h-4 w-4" /> },
  { value: "artist-desc", label: "Artist Z-A", icon: <User className="h-4 w-4" /> },
  { value: "period-asc", label: "Period (Oldest)", icon: <Calendar className="h-4 w-4" /> },
  { value: "period-desc", label: "Period (Newest)", icon: <Calendar className="h-4 w-4" /> },
  { value: "category-asc", label: "Category A-Z", icon: <Tag className="h-4 w-4" /> },
  { value: "category-desc", label: "Category Z-A", icon: <Tag className="h-4 w-4" /> },
]

export function SortControls({ currentSort, onSortChange, totalArtworks }: SortControlsProps) {
  const currentOption = sortOptions.find(option => option.value === currentSort)

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-lg">Sort by:</h3>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={currentSort === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onSortChange(option.value)}
              className="flex items-center gap-2"
            >
              {option.icon}
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-sm">
          {totalArtworks} artworks
        </Badge>
        {currentOption && (
          <Badge variant="outline" className="text-sm">
            {currentOption.label}
          </Badge>
        )}
      </div>
    </div>
  )
}

