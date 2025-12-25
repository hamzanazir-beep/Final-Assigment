"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import ProfileHeader from "@/components/profile-header"
import ProfileContent from "@/components/profile-content"
import { mockUsers, mockPosts } from "@/lib/mock-data"

export default function ProfilePage() {
  const params = useParams()
  const userId = params.id as string

  const [currentUser] = useState(mockUsers[0])
  const profileUser = mockUsers.find((u) => u.id === userId) || mockUsers[0]
  const userPosts = mockPosts.filter((p) => p.userId === userId)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentUser={currentUser} allUsers={mockUsers} />

      <div className="pt-14">
        <ProfileHeader user={profileUser} currentUser={currentUser} />
        <ProfileContent user={profileUser} posts={userPosts} currentUser={currentUser} />
      </div>
    </div>
  )
}
