"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PostCard from "./post-card"
import type { Post, User } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"
import Link from "next/link"

interface ProfileContentProps {
  user: User
  posts: Post[]
  currentUser: User
}

export default function ProfileContent({ user, posts, currentUser }: ProfileContentProps) {
  const friends = mockUsers.filter((u) => user.friends.includes(u.id))

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left Sidebar */}
        <div className="lg:col-span-2 space-y-4">
          {/* Intro */}
          <Card className="p-4">
            <h2 className="text-xl font-bold mb-4">Intro</h2>
            <p className="text-center text-gray-600 mb-4">{user.bio || "No bio yet"}</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>🏠 Lives in {user.location}</p>
              <p>📍 From {user.location}</p>
            </div>
          </Card>

          {/* Friends */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Friends</h2>
              <Link href="#" className="text-[#0866FF] hover:underline">
                See all friends
              </Link>
            </div>
            <p className="text-gray-600 mb-4">{friends.length} friends</p>
            <div className="grid grid-cols-3 gap-2">
              {friends.slice(0, 9).map((friend) => (
                <Link key={friend.id} href={`/profile/${friend.id}`}>
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 hover:opacity-90 transition-opacity">
                    <img
                      src={friend.profileImg || "/placeholder.svg"}
                      alt={friend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-semibold mt-1 truncate">{friend.name}</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Create Post (only for own profile) */}
          {user.id === currentUser.id && (
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={currentUser.profileImg || "/placeholder.svg"} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <button className="flex-1 text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500">
                  What's on your mind?
                </button>
              </div>
            </Card>
          )}

          {/* Posts */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} currentUser={currentUser} onLike={() => {}} onComment={() => {}} />
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500 text-lg">No posts yet</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
