"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageIcon, Smile, Video } from "lucide-react"
import type { User } from "@/lib/types"

interface CreatePostProps {
  currentUser: User
}

export default function CreatePost({ currentUser }: CreatePostProps) {
  return (
    <Card className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-2 mb-3">
        <Avatar>
          <AvatarImage src={currentUser.profileImg || "/placeholder.svg"} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <button className="flex-1 text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500">
          What's on your mind, {currentUser.name.split(" ")[0]}?
        </button>
      </div>

      <div className="border-t pt-3">
        <div className="flex items-center justify-around">
          <Button variant="ghost" className="flex-1 hover:bg-gray-100 gap-2">
            <Video className="w-6 h-6 text-red-500" />
            <span className="text-gray-600 font-semibold">Live video</span>
          </Button>
          <Button variant="ghost" className="flex-1 hover:bg-gray-100 gap-2">
            <ImageIcon className="w-6 h-6 text-green-500" />
            <span className="text-gray-600 font-semibold">Photo/video</span>
          </Button>
          <Button variant="ghost" className="flex-1 hover:bg-gray-100 gap-2">
            <Smile className="w-6 h-6 text-yellow-500" />
            <span className="text-gray-600 font-semibold hidden sm:inline">Feeling/activity</span>
            <span className="text-gray-600 font-semibold sm:hidden">Feeling</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
