export interface User {
  id: string
  name: string
  email: string
  profileImg: string
  coverImg?: string
  bio?: string
  location: string
  friends: string[]
  online?: boolean
}

export interface Comment {
  id: string
  userId: string
  text: string
  createdAt: string
}

export interface Post {
  id: string
  userId: string
  caption?: string
  image?: string
  likes: string[]
  comments: Comment[]
  shares: number
  createdAt: string
}

export interface Listing {
  id: string
  userId: string
  title: string
  description: string
  price: number
  image: string
  category: string
  condition: "new" | "like_new" | "used"
  location: string
  createdAt: string
  likes: string[]
  saved: string[]
}

export interface Video {
  id: string
  userId: string
  title: string
  thumbnail: string
  views: number
  duration: string
  createdAt: string
  likes: string[]
  category: string
}

export interface Group {
  id: string
  name: string
  description: string
  coverImg: string
  members: string[]
  privacy: "public" | "private"
  category: string
  admins: string[]
  createdAt: string
}

export interface LiveStream {
  id: string
  userId: string
  title: string
  thumbnail: string
  viewers: number
  category: string
  startedAt: string
  isLive: boolean
}

export interface GamePost {
  id: string
  userId: string
  game: string
  caption: string
  image?: string
  achievement?: string
  score?: number
  likes: string[]
  comments: Comment[]
  createdAt: string
}

export interface LikedPage {
  id: string
  name: string
  category: string
  followers: number
  coverImg: string
  verified: boolean
  description: string
}
