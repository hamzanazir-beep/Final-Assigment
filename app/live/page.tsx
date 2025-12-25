"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radio, Eye, Play } from "lucide-react"
import { mockLiveStreams, mockUsers } from "@/lib/mock-data"
import Link from "next/link"

export default function LivePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Gaming", "Technology", "Design", "Lifestyle"]

  const liveStreams = mockLiveStreams.filter((stream) => stream.isLive)
  const recentStreams = mockLiveStreams.filter((stream) => !stream.isLive)

  const filteredLive = liveStreams.filter((stream) =>
    selectedCategory === "All" ? true : stream.category === selectedCategory,
  )

  const filteredRecent = recentStreams.filter((stream) =>
    selectedCategory === "All" ? true : stream.category === selectedCategory,
  )

  const getUser = (userId: string) => mockUsers.find((u) => u.id === userId)

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Radio className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-bold">Live Videos</h1>
        </div>
        <Button variant="default" size="lg">
          <Radio className="w-5 h-5 mr-2" />
          Go Live
        </Button>
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

      {filteredLive.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
            <h2 className="text-xl font-semibold">Live Now ({filteredLive.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLive.map((stream) => {
              const streamer = getUser(stream.userId)
              if (!streamer) return null

              return (
                <Card key={stream.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative group">
                    <img
                      src={stream.thumbnail || "/placeholder.svg"}
                      alt={stream.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </Badge>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded flex items-center gap-1 text-sm">
                      <Eye className="w-4 h-4" />
                      {stream.viewers}
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex gap-3">
                      <Link href={`/profile/${streamer.id}`}>
                        <Avatar className="w-10 h-10 cursor-pointer">
                          <AvatarImage src={streamer.profileImg || "/placeholder.svg"} />
                          <AvatarFallback>{streamer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold line-clamp-2">{stream.title}</h3>
                        <Link href={`/profile/${streamer.id}`}>
                          <p className="text-sm text-gray-600 hover:underline">{streamer.name}</p>
                        </Link>
                        <Badge variant="outline" className="mt-1">
                          {stream.category}
                        </Badge>
                      </div>
                    </div>
                    <Button className="w-full" variant="default">
                      Watch Live
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {filteredRecent.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Live Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecent.map((stream) => {
              const streamer = getUser(stream.userId)
              if (!streamer) return null

              return (
                <Card key={stream.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative group">
                    <img
                      src={stream.thumbnail || "/placeholder.svg"}
                      alt={stream.title}
                      className="w-full h-48 object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex gap-3">
                      <Link href={`/profile/${streamer.id}`}>
                        <Avatar className="w-10 h-10 cursor-pointer">
                          <AvatarImage src={streamer.profileImg || "/placeholder.svg"} />
                          <AvatarFallback>{streamer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold line-clamp-2">{stream.title}</h3>
                        <Link href={`/profile/${streamer.id}`}>
                          <p className="text-sm text-gray-600 hover:underline">{streamer.name}</p>
                        </Link>
                        <Badge variant="outline" className="mt-1">
                          {stream.category}
                        </Badge>
                      </div>
                    </div>
                    <Button className="w-full bg-transparent" variant="outline">
                      Watch Replay
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {filteredLive.length === 0 && filteredRecent.length === 0 && (
        <div className="text-center py-12">
          <Radio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No live videos in this category at the moment.</p>
        </div>
      )}
    </div>
  )
}
