"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import Feed from "@/components/feed"
import Contacts from "@/components/contacts"
import { mockUsers, mockPosts } from "@/lib/mock-data"

export default function Home() {
  const [currentUser] = useState(mockUsers[0])
  const [posts, setPosts] = useState(mockPosts)

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = post.likes.includes(currentUser.id)
          return {
            ...post,
            likes: isLiked ? post.likes.filter((id) => id !== currentUser.id) : [...post.likes, currentUser.id],
          }
        }
        return post
      }),
    )
  }

  const handleComment = (postId: string, comment: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `comment-${Date.now()}`,
                userId: currentUser.id,
                text: comment,
                createdAt: new Date().toISOString(),
              },
            ],
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentUser={currentUser} allUsers={mockUsers} />

      <div className="pt-14">
        <div className="max-w-[1920px] mx-auto flex">
          <Sidebar currentUser={currentUser} />

          <main className="flex-1 px-4 py-4">
            <Feed posts={posts} currentUser={currentUser} onLike={handleLike} onComment={handleComment} />
          </main>

          <Contacts users={mockUsers.slice(1, 9)} />
        </div>
      </div>
    </div>
  )
}
