"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Post, User } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"
import { Send } from "lucide-react"

interface CommentSectionProps {
  post: Post
  currentUser: User
  onComment: (postId: string, comment: string) => void
}

export default function CommentSection({ post, currentUser, onComment }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")

  const handleSubmit = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText)
      setCommentText("")
    }
  }

  return (
    <div className="p-4 space-y-3">
      {/* Existing Comments */}
      {post.comments.map((comment) => {
        const commentAuthor = mockUsers.find((u) => u.id === comment.userId)!
        return (
          <div key={comment.id} className="flex gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={commentAuthor.profileImg || "/placeholder.svg"} />
              <AvatarFallback>{commentAuthor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-2xl px-3 py-2">
                <p className="font-semibold text-sm">{commentAuthor.name}</p>
                <p className="text-sm">{comment.text}</p>
              </div>
              <div className="flex gap-3 px-3 mt-1 text-xs text-gray-600">
                <button className="hover:underline font-semibold">Like</button>
                <button className="hover:underline font-semibold">Reply</button>
                <span>{new Date(comment.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        )
      })}

      {/* Add Comment */}
      <div className="flex gap-2 items-center">
        <Avatar className="w-8 h-8">
          <AvatarImage src={currentUser.profileImg || "/placeholder.svg"} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2 bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <Button size="icon" variant="ghost" className="h-6 w-6" disabled={!commentText.trim()} onClick={handleSubmit}>
            <Send className={`w-4 h-4 ${commentText.trim() ? "text-[#0866FF]" : "text-gray-400"}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}
