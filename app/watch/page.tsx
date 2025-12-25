"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, Search, Play, Eye } from "lucide-react"
import { mockVideos, mockUsers } from "@/lib/mock-data"
import Link from "next/link"

export default function WatchPage() {
  const [videos, setVideos] = useState(mockVideos)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Gaming", "Education", "Art & Design", "Photography", "Design", "Food & Travel"]

  const handleLike = (videoId: string) => {
    setVideos(
      videos.map((video) =>
        video.id === videoId
          ? {
              ...video,
              likes: video.likes.includes("user-1")
                ? video.likes.filter((id) => id !== "user-1")
                : [...video.likes, "user-1"],
            }
          : video,
      ),
    )
  }

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getUser = (userId: string) => mockUsers.find((u) => u.id === userId)

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Watch</h1>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search videos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => {
          const creator = getUser(video.userId)
          if (!creator) return null

          return (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative group">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-16 h-16 text-white" />
                </div>
                <Badge className="absolute bottom-2 right-2 bg-black/80">{video.duration}</Badge>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex gap-3">
                  <Link href={`/profile/${creator.id}`}>
                    <Avatar className="w-10 h-10 cursor-pointer">
                      <AvatarImage src={creator.profileImg || "/placeholder.svg"} />
                      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                    <Link href={`/profile/${creator.id}`}>
                      <p className="text-sm text-gray-600 hover:underline">{creator.name}</p>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views.toLocaleString()} views</span>
                  </div>
                  <Badge variant="outline">{video.category}</Badge>
                </div>
                <Button
                  variant={video.likes.includes("user-1") ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={() => handleLike(video.id)}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {video.likes.length} Likes
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No videos found matching your search.</p>
        </div>
      )}
    </div>
  )
}
