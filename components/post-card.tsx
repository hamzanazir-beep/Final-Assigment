"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import type { Post, User } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"
import CommentSection from "./comment-section"

interface PostCardProps {
  post: Post
  currentUser: User
  onLike: (postId: string) => void
  onComment: (postId: string, comment: string) => void
}

export default function PostCard({ post, currentUser, onLike, onComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const author = mockUsers.find((u) => u.id === post.userId)!
  const isLiked = post.likes.includes(currentUser.id)

  return (
    <Card className="bg-white rounded-lg shadow">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={author.profileImg || "/placeholder.svg"} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold hover:underline cursor-pointer">{author.name}</h3>
              <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        {/* Post Content */}
        {post.caption && <p className="mb-3 text-gray-900">{post.caption}</p>}
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="w-full">
          <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full object-cover" />
        </div>
      )}

      {/* Reactions Count */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <div className="bg-[#0866FF] rounded-full p-1">
            <ThumbsUp className="w-3 h-3 text-white fill-white" />
          </div>
          <span>{post.likes.length}</span>
        </div>
        <div className="flex gap-3">
          <span className="hover:underline cursor-pointer">{post.comments.length} comments</span>
          <span className="hover:underline cursor-pointer">{post.shares} shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-b px-2 py-1">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            className={`flex-1 hover:bg-gray-100 gap-2 ${isLiked ? "text-[#0866FF]" : "text-gray-600"}`}
            onClick={() => onLike(post.id)}
          >
            <ThumbsUp className={`w-5 h-5 ${isLiked ? "fill-[#0866FF]" : ""}`} />
            <span className="font-semibold">Like</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 hover:bg-gray-100 gap-2 text-gray-600"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">Comment</span>
          </Button>
          <Button variant="ghost" className="flex-1 hover:bg-gray-100 gap-2 text-gray-600">
            <Share2 className="w-5 h-5" />
            <span className="font-semibold">Share</span>
          </Button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && <CommentSection post={post} currentUser={currentUser} onComment={onComment} />}
    </Card>
  )
}
