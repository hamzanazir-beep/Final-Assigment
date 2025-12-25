"use client"
import PostCard from "./post-card"
import CreatePost from "./create-post"
import type { Post, User } from "@/lib/types"

interface FeedProps {
  posts: Post[]
  currentUser: User
  onLike: (postId: string) => void
  onComment: (postId: string, comment: string) => void
}

export default function Feed({ posts, currentUser, onLike, onComment }: FeedProps) {
  return (
    <div className="max-w-[680px] mx-auto space-y-4">
      <CreatePost currentUser={currentUser} />

      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUser={currentUser} onLike={onLike} onComment={onComment} />
      ))}
    </div>
  )
}
