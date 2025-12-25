"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MapPin, ChevronLeft, Bookmark } from "lucide-react"
import Link from "next/link"
import { mockUsers, mockListings } from "@/lib/mock-data"

export default function SavedListingsPage() {
  const [currentUser] = useState(mockUsers[0])
  const [listings, setListings] = useState(mockListings)

  const savedListings = listings.filter((listing) => listing.saved.includes(currentUser.id))

  const handleUnsave = (listingId: string) => {
    setListings(
      listings.map((listing) => {
        if (listing.id === listingId) {
          return {
            ...listing,
            saved: listing.saved.filter((id) => id !== currentUser.id),
          }
        }
        return listing
      }),
    )
  }

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentUser={currentUser} allUsers={mockUsers} />

      <div className="pt-14">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Back Button */}
          <Link href="/marketplace">
            <Button variant="ghost" className="mb-4 flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Marketplace
            </Button>
          </Link>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#0866FF] p-3 rounded-lg">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Saved Items</h1>
              <p className="text-gray-600">{savedListings.length} items saved</p>
            </div>
          </div>

          {/* Saved Listings Grid */}
          {savedListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {savedListings.map((listing) => {
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
                              handleUnsave(listing.id)
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
            <Card className="p-12 text-center">
              <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No saved items yet</h2>
              <p className="text-gray-500 mb-6">
                Items you save will appear here. Start browsing to find something you like!
              </p>
              <Link href="/marketplace">
                <Button className="bg-[#0866FF] hover:bg-[#0756d4]">Browse Marketplace</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
