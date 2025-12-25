"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MapPin, Clock, Tag, MessageCircle, Share2, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { mockUsers, mockListings } from "@/lib/mock-data"

export default function ListingDetailPage() {
  const params = useParams()
  const listingId = params.id as string

  const [currentUser] = useState(mockUsers[0])
  const [listings, setListings] = useState(mockListings)

  const listing = listings.find((l) => l.id === listingId)
  const seller = mockUsers.find((u) => u.id === listing?.userId)

  if (!listing || !seller) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar currentUser={currentUser} allUsers={mockUsers} />
        <div className="pt-14 flex items-center justify-center h-[calc(100vh-56px)]">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Listing not found</h2>
            <p className="text-gray-500 mb-4">This listing may have been removed or does not exist.</p>
            <Link href="/marketplace">
              <Button className="bg-[#0866FF] hover:bg-[#0756d4]">Back to Marketplace</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  const isLiked = listing.likes.includes(currentUser.id)
  const isSaved = listing.saved.includes(currentUser.id)

  const handleLike = () => {
    setListings(
      listings.map((l) => {
        if (l.id === listingId) {
          const liked = l.likes.includes(currentUser.id)
          return {
            ...l,
            likes: liked ? l.likes.filter((id) => id !== currentUser.id) : [...l.likes, currentUser.id],
          }
        }
        return l
      }),
    )
  }

  const handleSave = () => {
    setListings(
      listings.map((l) => {
        if (l.id === listingId) {
          const saved = l.saved.includes(currentUser.id)
          return {
            ...l,
            saved: saved ? l.saved.filter((id) => id !== currentUser.id) : [...l.saved, currentUser.id],
          }
        }
        return l
      }),
    )
  }

  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    const days = Math.floor(seconds / 86400)
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
    const hours = Math.floor(seconds / 3600)
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    return "Just now"
  }

  // Get related listings from same category
  const relatedListings = mockListings.filter((l) => l.category === listing.category && l.id !== listing.id).slice(0, 4)

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Image and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md">
                      {listing.condition === "new" ? "New" : listing.condition === "like_new" ? "Like New" : "Used"}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Details */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
                    <p className="text-4xl font-bold text-[#0866FF] mb-4">${listing.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleLike}
                      className={isLiked ? "text-[#0866FF] border-[#0866FF]" : ""}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? "fill-[#0866FF]" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSave}
                      className={isSaved ? "text-red-500 border-red-500" : ""}
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? "fill-red-500" : ""}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>Listed {timeAgo(listing.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Tag className="w-5 h-5" />
                    <span>{listing.category}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h2 className="font-semibold text-lg mb-2">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                </div>

                <div className="flex items-center gap-2 mt-6 pt-6 border-t">
                  <Heart className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">
                    {listing.likes.length} {listing.likes.length === 1 ? "person likes" : "people like"} this
                  </span>
                </div>
              </Card>
            </div>

            {/* Right Column - Seller Info */}
            <div className="space-y-6">
              {/* Seller Card */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Seller Information</h3>
                <Link href={`/profile/${seller.id}`} className="flex items-center gap-3 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={seller.profileImg || "/placeholder.svg"} />
                    <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg hover:underline">{seller.name}</h4>
                    <p className="text-sm text-gray-500">{seller.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${seller.online ? "bg-green-500" : "bg-gray-400"}`} />
                      <span className="text-xs text-gray-600">{seller.online ? "Online now" : "Offline"}</span>
                    </div>
                  </div>
                </Link>

                <div className="space-y-2">
                  <Button className="w-full bg-[#0866FF] hover:bg-[#0756d4] flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Message Seller
                  </Button>
                  <Link href={`/profile/${seller.id}`} className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Tips Card */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-lg mb-2 text-blue-900">Safety Tips</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Meet in a public place</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Check the item before buying</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Pay only after collecting item</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Don't share personal info</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Related Listings */}
          {relatedListings.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Related Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedListings.map((item) => {
                  const itemSeller = mockUsers.find((u) => u.id === item.userId)
                  return (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <Link href={`/marketplace/${item.id}`}>
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-40 object-cover cursor-pointer"
                        />
                      </Link>
                      <div className="p-4">
                        <Link href={`/marketplace/${item.id}`}>
                          <h3 className="font-semibold hover:underline cursor-pointer line-clamp-1 mb-1">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-xl font-bold text-[#0866FF] mb-2">${item.price}</p>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={itemSeller?.profileImg || "/placeholder.svg"} />
                            <AvatarFallback>{itemSeller?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-600">{itemSeller?.name}</span>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
