"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Search } from "lucide-react"
import Link from "next/link"
import { mockUsers } from "@/lib/mock-data"

export default function FriendsPage() {
  const [currentUser] = useState(mockUsers[0])
  const [searchQuery, setSearchQuery] = useState("")

  // Get friends of current user
  const friends = mockUsers.filter((user) => currentUser.friends.includes(user.id))

  // Get friend suggestions (users who are not friends)
  const suggestions = mockUsers.filter((user) => !currentUser.friends.includes(user.id) && user.id !== currentUser.id)

  // Filter based on search query
  const filteredFriends = searchQuery
    ? friends.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : friends

  const filteredSuggestions = searchQuery
    ? suggestions.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : suggestions

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentUser={currentUser} allUsers={mockUsers} />

      <div className="pt-14">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Friends</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search friends"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>

          {/* Friends List */}
          {filteredFriends.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                All Friends ({filteredFriends.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFriends.map((friend) => (
                  <Card key={friend.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <Link href={`/profile/${friend.id}`}>
                        <Avatar className="w-16 h-16 cursor-pointer">
                          <AvatarImage src={friend.profileImg || "/placeholder.svg"} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1">
                        <Link href={`/profile/${friend.id}`}>
                          <h3 className="font-semibold hover:underline cursor-pointer">{friend.name}</h3>
                        </Link>
                        {friend.location && <p className="text-sm text-gray-500">{friend.location}</p>}
                        <div className="flex items-center gap-2 mt-2">
                          <div className={`w-2 h-2 rounded-full ${friend.online ? "bg-green-500" : "bg-gray-400"}`} />
                          <span className="text-xs text-gray-600">{friend.online ? "Online" : "Offline"}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Friend Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                People You May Know
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSuggestions.map((user) => (
                  <Card key={user.id} className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <Link href={`/profile/${user.id}`}>
                        <Avatar className="w-20 h-20 mb-3 cursor-pointer">
                          <AvatarImage src={user.profileImg || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <Link href={`/profile/${user.id}`}>
                        <h3 className="font-semibold hover:underline cursor-pointer mb-1">{user.name}</h3>
                      </Link>
                      {user.location && <p className="text-sm text-gray-500 mb-3">{user.location}</p>}
                      <Button className="w-full bg-[#0866FF] hover:bg-[#0756d4]">Add Friend</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {filteredFriends.length === 0 && filteredSuggestions.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
