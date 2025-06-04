import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sparkles, Search, Github } from "lucide-react"
import { MobileMenu } from "@/components/ui/mobile-menu"

export default function SEOPage() {
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
              <Button variant="ghost" asChild>
                <Link href="/content">Content</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/new-dev">New Dev</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/reports">Reports</Link>
              </Button>
              <Button variant="ghost" asChild className="bg-blue-50 text-blue-600">
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
            <MobileMenu currentPage="seo" />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
              SEO & Search Optimisation
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Optimise your website&apos;s search engine performance and improve your online visibility with advanced SEO tools and analytics.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Keyword Research</h3>
              <p className="text-slate-600 text-sm">
                Discover high-value keywords and analyse search trends to optimise your content strategy.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Technical SEO</h3>
              <p className="text-slate-600 text-sm">
                Comprehensive site audits and technical optimisation to improve search engine crawling and indexing.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Performance Analytics</h3>
              <p className="text-slate-600 text-sm">
                Monitor rankings, track performance metrics, and measure the success of your SEO campaigns.
              </p>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Coming Soon</h2>
            <p className="text-slate-600">
              Advanced SEO tools and analytics dashboard are currently in development.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>&copy; 2025 Alan Batt Technology Hub. SEO tools coming soon.</p>
      </footer>
    </div>
  )
} 