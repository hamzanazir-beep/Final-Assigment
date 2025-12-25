"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Video, Store, Users2, Heart, Radio, Gamepad2 } from "lucide-react"
import type { User } from "@/lib/types"
import { usePathname } from "next/navigation"

interface SidebarProps {
  currentUser: User
}

export default function Sidebar({ currentUser }: SidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { icon: Users, label: "Friends", href: "/friends" },
    { icon: Video, label: "Watch", href: "/watch" },
    { icon: Store, label: "Marketplace", href: "/marketplace" },
    { icon: Users2, label: "Groups", href: "/groups" },
    { icon: Heart, label: "Liked", href: "/liked" },
    { icon: Radio, label: "Live", href: "/live" },
    { icon: Gamepad2, label: "Gaming", href: "/gaming" },
  ]

  return (
    <aside className="hidden lg:block w-80 h-[calc(100vh-56px)] sticky top-14 overflow-y-auto px-2 py-4">
      <div className="space-y-1">
        <Link
          href={`/profile/${currentUser.id}`}
          className={`flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors ${
            pathname === `/profile/${currentUser.id}` ? "bg-gray-200" : ""
          }`}
        >
          <Avatar className="w-9 h-9">
            <AvatarImage src={currentUser.profileImg || "/placeholder.svg"} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{currentUser.name}</span>
        </Link>

        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors ${
              pathname === item.href ? "bg-gray-200" : ""
            }`}
          >
            <div className="w-9 h-9 flex items-center justify-center">
              <item.icon className="w-7 h-7 text-[#0866FF]" />
            </div>
            <span className="font-semibold">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
