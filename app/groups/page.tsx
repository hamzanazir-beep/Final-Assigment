"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Lock, Globe } from "lucide-react"
import { mockGroups } from "@/lib/mock-data"

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Technology", "Art & Photography", "Gaming", "Business & Marketing", "Design", "Travel"]

  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || group.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const myGroups = mockGroups.filter((group) => group.members.includes("user-1"))
  const suggestedGroups = mockGroups.filter((group) => !group.members.includes("user-1"))

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Groups</h1>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search groups"
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

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Groups ({myGroups.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myGroups
              .filter((group) => {
                const matchesSearch =
                  group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  group.description.toLowerCase().includes(searchQuery.toLowerCase())
                const matchesCategory = selectedCategory === "All" || group.category === selectedCategory
                return matchesSearch && matchesCategory
              })
              .map((group) => (
                <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={group.coverImg || "/placeholder.svg"}
                    alt={group.name}
                    className="w-full h-40 object-cover"
                  />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{group.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          {group.privacy === "private" ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          <span className="capitalize">{group.privacy} Group</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{group.members.length} members</span>
                      <Badge variant="outline" className="ml-auto">
                        {group.category}
                      </Badge>
                    </div>
                    <Button className="w-full" variant="default">
                      View Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Suggested Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedGroups
              .filter((group) => {
                const matchesSearch =
                  group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  group.description.toLowerCase().includes(searchQuery.toLowerCase())
                const matchesCategory = selectedCategory === "All" || group.category === selectedCategory
                return matchesSearch && matchesCategory
              })
              .map((group) => (
                <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={group.coverImg || "/placeholder.svg"}
                    alt={group.name}
                    className="w-full h-40 object-cover"
                  />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{group.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          {group.privacy === "private" ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          <span className="capitalize">{group.privacy} Group</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{group.members.length} members</span>
                      <Badge variant="outline" className="ml-auto">
                        {group.category}
                      </Badge>
                    </div>
                    <Button className="w-full bg-transparent" variant="outline">
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No groups found matching your search.</p>
        </div>
      )}
    </div>
  )
}
