"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageCircle, Share2, Trophy, Gamepad2 } from "lucide-react"
import { mockGamePosts, mockUsers } from "@/lib/mock-data"
import Link from "next/link"

export default function GamingPage() {
  const [gamePosts, setGamePosts] = useState(mockGamePosts)

  const handleLike = (postId: string) => {
    setGamePosts(
      gamePosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.includes("user-1")
                ? post.likes.filter((id) => id !== "user-1")
                : [...post.likes, "user-1"],
            }
          : post,
      ),
    )
  }

  const getUser = (userId: string) => mockUsers.find((u) => u.id === userId)

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gamepad2 className="w-8 h-8 text-[#0866FF]" />
          <h1 className="text-3xl font-bold">Gaming</h1>
        </div>
        <Button variant="default" size="lg">
          Share Achievement
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Trophy className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold">Gaming Hub</h2>
              <p className="text-white/90">Share your achievements, gameplay, and connect with gamers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {gamePosts.map((post) => {
          const author = getUser(post.userId)
          if (!author) return null

          return (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <Link href={`/profile/${author.id}`}>
                      <Avatar className="w-12 h-12 cursor-pointer">
                        <AvatarImage src={author.profileImg || "/placeholder.svg"} />
                        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div>
                      <Link href={`/profile/${author.id}`}>
                        <p className="font-semibold hover:underline">{author.name}</p>
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Gamepad2 className="w-4 h-4" />
                        <span>{post.game}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  {post.achievement && (
                    <Badge variant="default" className="bg-yellow-500 text-white flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {post.achievement}
                    </Badge>
                  )}
                </div>

                <p className="text-gray-800">{post.caption}</p>

                {post.score && (
                  <div className="bg-gray-100 rounded-lg p-3 inline-block">
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="text-2xl font-bold text-[#0866FF]">{post.score.toLocaleString()}</p>
                  </div>
                )}

                {post.image && (
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.caption}
                    className="w-full rounded-lg max-h-96 object-cover"
                  />
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                  <Button
                    variant={post.likes.includes("user-1") ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleLike(post.id)}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {post.likes.length}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {post.comments.length}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {post.comments.length > 0 && (
                  <div className="space-y-3 pt-2 border-t">
                    {post.comments.map((comment) => {
                      const commenter = getUser(comment.userId)
                      if (!commenter) return null

                      return (
                        <div key={comment.id} className="flex gap-2">
                          <Link href={`/profile/${commenter.id}`}>
                            <Avatar className="w-8 h-8 cursor-pointer">
                              <AvatarImage src={commenter.profileImg || "/placeholder.svg"} />
                              <AvatarFallback>{commenter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </Link>
                          <div className="bg-gray-100 rounded-lg px-3 py-2 flex-1">
                            <Link href={`/profile/${commenter.id}`}>
                              <p className="font-semibold text-sm hover:underline">{commenter.name}</p>
                            </Link>
                            <p className="text-sm">{comment.text}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
