"use client"

import { Search, Home, Users, Video, Store, Menu, X, Gamepad2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { User } from "@/lib/types"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"

interface NavbarProps {
  currentUser: User
  allUsers: User[]
}

export default function Navbar({ currentUser, allUsers }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const filteredUsers = searchQuery.trim()
    ? allUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-[1920px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left section */}
          <div className="flex items-center gap-2 flex-1">
            <Link href="/" className="flex items-center">
              <div className="bg-[#0866FF] text-white font-bold text-2xl w-10 h-10 rounded-full flex items-center justify-center">
                f
              </div>
            </Link>
            <div ref={searchRef} className="hidden md:flex relative ml-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
              <input
                type="text"
                placeholder="Search Facebook"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowResults(true)
                }}
                onFocus={() => setShowResults(true)}
                className="pl-10 pr-10 py-2 bg-gray-100 rounded-full w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setShowResults(false)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hover:bg-gray-200 rounded-full p-1"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}

              {/* Search Results Dropdown */}
              {showResults && searchQuery.trim() && (
                <div className="absolute top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                  {filteredUsers.length > 0 ? (
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Users</div>
                      {filteredUsers.map((user) => (
                        <Link
                          key={user.id}
                          href={`/profile/${user.id}`}
                          onClick={() => {
                            setSearchQuery("")
                            setShowResults(false)
                          }}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.profileImg || "/placeholder.svg"} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{user.name}</div>
                            {user.location && <div className="text-xs text-gray-500">{user.location}</div>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500">No results found for "{searchQuery}"</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Center section */}
          <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            <Link href="/">
              <Button
                variant="ghost"
                className={`relative px-12 py-6 hover:bg-gray-100 ${
                  pathname === "/" ? "border-b-4 border-[#0866FF]" : ""
                }`}
              >
                <Home className={`w-6 h-6 ${pathname === "/" ? "text-[#0866FF]" : "text-gray-600"}`} />
              </Button>
            </Link>
            <Link href="/friends">
              <Button
                variant="ghost"
                className={`relative px-12 py-6 hover:bg-gray-100 ${
                  pathname === "/friends" ? "border-b-4 border-[#0866FF]" : ""
                }`}
              >
                <Users className={`w-6 h-6 ${pathname === "/friends" ? "text-[#0866FF]" : "text-gray-600"}`} />
              </Button>
            </Link>
            <Link href="/watch">
              <Button
                variant="ghost"
                className={`relative px-12 py-6 hover:bg-gray-100 ${
                  pathname === "/watch" ? "border-b-4 border-[#0866FF]" : ""
                }`}
              >
                <Video className={`w-6 h-6 ${pathname === "/watch" ? "text-[#0866FF]" : "text-gray-600"}`} />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                variant="ghost"
                className={`relative px-12 py-6 hover:bg-gray-100 ${
                  pathname === "/marketplace" ? "border-b-4 border-[#0866FF]" : ""
                }`}
              >
                <Store className={`w-6 h-6 ${pathname === "/marketplace" ? "text-[#0866FF]" : "text-gray-600"}`} />
              </Button>
            </Link>
            <Link href="/gaming">
              <Button
                variant="ghost"
                className={`relative px-12 py-6 hover:bg-gray-100 ${
                  pathname === "/gaming" ? "border-b-4 border-[#0866FF]" : ""
                }`}
              >
                <Gamepad2 className={`w-6 h-6 ${pathname === "/gaming" ? "text-[#0866FF]" : "text-gray-600"}`} />
              </Button>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 hover:bg-gray-300">
              <Menu className="w-5 h-5" />
            </Button>
            <Link href={`/profile/${currentUser.id}`}>
              <Avatar className="cursor-pointer">
                <AvatarImage src={currentUser.profileImg || "/placeholder.svg"} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
