"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle2, Bell, BellOff } from "lucide-react"
import { mockLikedPages } from "@/lib/mock-data"

export default function LikedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [notifications, setNotifications] = useState<string[]>(["page-1", "page-3", "page-5"])

  const categories = ["All", "Media & News", "Gaming", "Software", "Sports & Recreation", "Chef"]

  const toggleNotifications = (pageId: string) => {
    setNotifications((prev) => (prev.includes(pageId) ? prev.filter((id) => id !== pageId) : [...prev, pageId]))
  }

  const filteredPages = mockLikedPages.filter((page) => {
    const matchesSearch =
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || page.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pages You Like</h1>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search pages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPages.map((page) => (
          <Card key={page.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img src={page.coverImg || "/placeholder.svg"} alt={page.name} className="w-full h-40 object-cover" />
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{page.name}</h3>
                    {page.verified && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                  </div>
                  <p className="text-sm text-gray-600">{page.followers.toLocaleString()} followers</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant="outline">{page.category}</Badge>
              <p className="text-sm text-gray-600 line-clamp-2">{page.description}</p>
              <div className="flex gap-2">
                <Button className="flex-1" variant="default">
                  View Page
                </Button>
                <Button
                  variant={notifications.includes(page.id) ? "default" : "outline"}
                  size="icon"
                  onClick={() => toggleNotifications(page.id)}
                >
                  {notifications.includes(page.id) ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No pages found matching your search.</p>
        </div>
      )}
    </div>
  )
}
