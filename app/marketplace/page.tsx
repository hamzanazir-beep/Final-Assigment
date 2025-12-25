"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Heart, MapPin, Filter, Tag } from "lucide-react"
import Link from "next/link"
import { mockUsers, mockListings } from "@/lib/mock-data"

export default function MarketplacePage() {
  const [currentUser] = useState(mockUsers[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [listings, setListings] = useState(mockListings)

  const categories = ["all", "Electronics", "Furniture", "Sports", "Fashion", "Music"]

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLike = (listingId: string) => {
    setListings(
      listings.map((listing) => {
        if (listing.id === listingId) {
          const isLiked = listing.likes.includes(currentUser.id)
          return {
            ...listing,
            likes: isLiked ? listing.likes.filter((id) => id !== currentUser.id) : [...listing.likes, currentUser.id],
          }
        }
        return listing
      }),
    )
  }

  const handleSave = (listingId: string) => {
    setListings(
      listings.map((listing) => {
        if (listing.id === listingId) {
          const isSaved = listing.saved.includes(currentUser.id)
          return {
            ...listing,
            saved: isSaved ? listing.saved.filter((id) => id !== currentUser.id) : [...listing.saved, currentUser.id],
          }
        }
        return listing
      }),
    )
  }

  const savedCount = listings.filter((listing) => listing.saved.includes(currentUser.id)).length

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentUser={currentUser} allUsers={mockUsers} />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <Link href="/marketplace/saved">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Heart className="w-4 h-4" />
                Saved ({savedCount})
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search marketplace"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  selectedCategory === category ? "bg-[#0866FF] hover:bg-[#0756d4]" : ""
                }`}
              >
                {category === "all" ? "All Items" : category}
              </Button>
            ))}
          </div>

          {/* Listings Grid */}
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredListings.map((listing) => {
                const seller = mockUsers.find((u) => u.id === listing.userId)
                const isLiked = listing.likes.includes(currentUser.id)
                const isSaved = listing.saved.includes(currentUser.id)

                return (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/marketplace/${listing.id}`}>
                      <div className="relative">
                        <img
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.title}
                          className="w-full h-48 object-cover cursor-pointer"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              handleSave(listing.id)
                            }}
                            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                          >
                            <Heart className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                          </button>
                        </div>
                        <div className="absolute top-2 left-2">
                          <span className="bg-white/90 px-2 py-1 rounded text-xs font-semibold">
                            {listing.condition === "new"
                              ? "New"
                              : listing.condition === "like_new"
                                ? "Like New"
                                : "Used"}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="p-4">
                      <Link href={`/marketplace/${listing.id}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:underline cursor-pointer line-clamp-1">
                          {listing.title}
                        </h3>
                      </Link>
                      <p className="text-2xl font-bold text-[#0866FF] mb-2">${listing.price}</p>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{listing.location}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <Link href={`/profile/${seller?.id}`} className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={seller?.profileImg || "/placeholder.svg"} />
                            <AvatarFallback>{seller?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium hover:underline">{seller?.name}</span>
                        </Link>

                        <button
                          onClick={() => handleLike(listing.id)}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#0866FF] transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-[#0866FF] text-[#0866FF]" : ""}`} />
                          <span>{listing.likes.length}</span>
                        </button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No listings found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
