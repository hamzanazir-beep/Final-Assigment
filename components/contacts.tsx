"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Video } from "lucide-react"
import type { User } from "@/lib/types"

interface ContactsProps {
  users: User[]
}

export default function Contacts({ users }: ContactsProps) {
  return (
    <aside className="hidden xl:block w-80 h-[calc(100vh-56px)] sticky top-14 overflow-y-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-600 font-semibold text-lg">Contacts</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Video className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Search className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
          >
            <div className="relative">
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.profileImg || "/placeholder.svg"} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {user.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <span className="text-sm font-semibold">{user.name}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
