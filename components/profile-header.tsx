"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, UserPlus, MessageCircle } from "lucide-react"
import type { User } from "@/lib/types"

interface ProfileHeaderProps {
  user: User
  currentUser: User
}

export default function ProfileHeader({ user, currentUser }: ProfileHeaderProps) {
  const isOwnProfile = user.id === currentUser.id

  return (
    <div className="bg-white shadow">
      <div className="max-w-[1100px] mx-auto">
        {/* Cover Photo */}
        <div className="relative h-[348px] bg-gradient-to-br from-gray-300 to-gray-400 rounded-b-lg overflow-hidden">
          {user.coverImg && (
            <img src={user.coverImg || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
          )}
          {isOwnProfile && (
            <Button className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 text-gray-900" size="sm">
              <Camera className="w-4 h-4 mr-2" />
              Edit cover photo
            </Button>
          )}
        </div>

        {/* Profile Info */}
        <div className="px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-end -mt-8 pb-4">
            <div className="relative">
              <Avatar className="w-40 h-40 border-4 border-white">
                <AvatarImage src={user.profileImg || "/placeholder.svg"} />
                <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <button className="absolute bottom-2 right-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="flex-1 text-center md:text-left md:mb-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.friends.length} friends</p>
            </div>

            <div className="flex gap-2 md:mb-2">
              {isOwnProfile ? (
                <Button className="bg-[#0866FF] hover:bg-[#0758d4]">Edit profile</Button>
              ) : (
                <>
                  <Button className="bg-[#0866FF] hover:bg-[#0758d4]">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add friend
                  </Button>
                  <Button variant="secondary">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Profile Navigation */}
          <div className="border-t">
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant="ghost"
                className="border-b-4 border-[#0866FF] rounded-none px-4 py-4 text-[#0866FF] font-semibold"
              >
                Posts
              </Button>
              <Button variant="ghost" className="rounded-none px-4 py-4 font-semibold hover:bg-gray-100">
                About
              </Button>
              <Button variant="ghost" className="rounded-none px-4 py-4 font-semibold hover:bg-gray-100">
                Friends
              </Button>
              <Button variant="ghost" className="rounded-none px-4 py-4 font-semibold hover:bg-gray-100">
                Photos
              </Button>
              <Button variant="ghost" className="rounded-none px-4 py-4 font-semibold hover:bg-gray-100">
                Videos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
