import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sparkles, FileText, Github, Calendar, Clock, ArrowRight, TrendingUp, CheckCircle, Eye, Users, Mail, Share2, Newspaper } from "lucide-react"
import { MobileMenu } from "@/components/ui/mobile-menu"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  status: 'draft' | 'review' | 'approved' | 'published'
  category: 'News & Insights Post' | 'Social Post' | 'Email'
}

const blogPosts: BlogPost[] = [
  {
    slug: 'uk-house-price-data-lag-2025',
    title: 'Why UK House Price Data is 6 Months Behind Reality (And How Smart Buyers Are Staying Ahead in 2025)',
    excerpt: 'Official UK house price data lags 2-6 months behind actual market conditions. Discover how to read real-time market signals and make informed property decisions.',
    date: '3rd June 2025',
    readTime: '5 minutes',
    status: 'published',
    category: 'News & Insights Post'
  }
  // Add more posts here as they're created
]

export default function ContentPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'published': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'published':
        return <CheckCircle className="w-4 h-4" />
      case 'review':
        return <Eye className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'News & Insights Post': return 'bg-blue-100 text-blue-800'
      case 'Social Post': return 'bg-purple-100 text-purple-800'
      case 'Email': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'News & Insights Post': return <Newspaper className="w-4 h-4" />
      case 'Social Post': return <Share2 className="w-4 h-4" />
      case 'Email': return <Mail className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const categoryStats = {
    'News & Insights Post': blogPosts.filter(p => p.category === 'News & Insights Post').length,
    'Social Post': blogPosts.filter(p => p.category === 'Social Post').length,
    'Email': blogPosts.filter(p => p.category === 'Email').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Alan Batt Technology Hub</span>
          </div>
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-6">
              <Button variant="ghost" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/ai">AI</Link>
              </Button>
              <Button variant="ghost" asChild className="bg-blue-50 text-blue-600">
                <Link href="/content">Content</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/new-dev">New Dev</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/reports">Reports</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/seo">SEO</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/markets">Markets</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/downloads">Downloads</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com/zenifieduk/alan-batt" target="_blank">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                Contact
              </Button>
            </div>
            
            {/* Mobile Menu */}
            <MobileMenu currentPage="content" />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
              Content Repository
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Professional content creation and management across all channels - articles, social posts, and email campaigns.
            </p>
          </div>

          {/* Content Categories Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Newspaper className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">News & Insights</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{categoryStats['News & Insights Post']}</div>
              <div className="text-sm text-blue-700">Long-form articles</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Share2 className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-900">Social Posts</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{categoryStats['Social Post']}</div>
              <div className="text-sm text-purple-700">Social media content</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Mail className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-900">Emails</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{categoryStats['Email']}</div>
              <div className="text-sm text-green-700">Email campaigns</div>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{blogPosts.length}</div>
              <div className="text-sm text-slate-600">Total Content</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{blogPosts.filter(p => p.status === 'published').length}</div>
              <div className="text-sm text-slate-600">Published</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{blogPosts.filter(p => p.status === 'review').length}</div>
              <div className="text-sm text-slate-600">In Review</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{blogPosts.filter(p => p.status === 'draft').length}</div>
              <div className="text-sm text-slate-600">Drafts</div>
            </div>
          </div>

          {/* Content Posts */}
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <div key={post.slug} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(post.category).replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                      {getCategoryIcon(post.category)}
                    </div>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                    {getStatusIcon(post.status)}
                    <span className="capitalize">{post.status}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-slate-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/content/${post.slug}`} className="flex items-center">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/content/${post.slug}`} className="flex items-center">
                        Read Content
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Management Info */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Client Review Process</h3>
              <p className="text-slate-600 text-sm mb-4">
                All content goes through a structured review and approval process. Clients can preview content across all formats, 
                provide feedback, and approve before publication or distribution.
              </p>
              <div className="text-xs text-slate-500">
                Draft → Review → Approved → Published/Sent
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Multi-Channel Strategy</h3>
              <p className="text-slate-600 text-sm mb-4">
                Comprehensive content strategy across news articles, social media posts, and email campaigns. 
                Consistent messaging adapted for each platform and audience.
              </p>
              <div className="text-xs text-slate-500">
                Content types: Articles • Social Posts • Email Campaigns
              </div>
            </div>
          </div>

          {/* Add New Content */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mt-12 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Create New Content</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Ready to add more content to your repository? Choose the type of content you need and our team 
              will create professional, engaging material tailored to your audience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button variant="outline" asChild>
                <Link href="mailto:hello@alanbatt.co.uk?subject=News Article Request">
                  <Newspaper className="w-4 h-4 mr-2" />
                  Request Article
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="mailto:hello@alanbatt.co.uk?subject=Social Content Request">
                  <Share2 className="w-4 h-4 mr-2" />
                  Social Content
                </Link>
              </Button>
              <Button asChild>
                <Link href="mailto:hello@alanbatt.co.uk?subject=Email Campaign Request">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Campaign
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>&copy; 2025 Alan Batt Technology Hub. Professional content creation and management.</p>
      </footer>
    </div>
  )
} 