"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowLeft, Calendar, Clock, CheckCircle, XCircle, Github, Newspaper, Share2, Mail, List } from "lucide-react"
import { MobileMenu } from "@/components/ui/mobile-menu"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPost {
  title: string
  content: string
  date: string
  readTime: string
  status: 'draft' | 'review' | 'approved' | 'published'
  category: 'News & Insights Post' | 'Social Post' | 'Email'
}

interface PageProps {
  params: Promise<{ slug: string }>
}

interface TOCItem {
  id: string
  title: string
  level: number
}

// Consistent ID generation function
const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim()
}

export default function BlogPostPage({ params }: PageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [slug, setSlug] = useState<string>('')
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    loadParams()
  }, [params])

  useEffect(() => {
    if (!slug) return

    const loadPost = async () => {
      try {
        // For now, we'll load the markdown file directly
        // In a real system, this would be an API call
        if (slug === 'uk-house-price-data-lag-2025') {
          const response = await fetch('/articles/uk-house-price-data-lag-2025.md')
          if (!response.ok) throw new Error('Post not found')
          
          const content = await response.text()
          
          // Parse the frontmatter-style content
          const lines = content.split('\n')
          const title = lines[0].replace('# ', '')
          const publishedLine = lines.find(line => line.includes('Published:'))
          const readTimeLine = lines.find(line => line.includes('Reading time:'))
          
          // Extract headings for TOC
          const headingRegex = /^(#{2,3})\s+(.+)$/gm
          const headings: TOCItem[] = []
          let match
          
          while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length
            const title = match[2].trim()
            
            // Skip headings that are just markdown separators or don't contain meaningful content
            if (title && !title.startsWith('---') && title.length > 1) {
              const id = generateHeadingId(title)
              headings.push({ id, title, level })
            }
          }
          
          setTocItems(headings)
          setPost({
            title,
            content,
            date: publishedLine?.split('Published: ')[1]?.split(' |')[0] || '3rd June 2025',
            readTime: readTimeLine?.split('Reading time: ')[1]?.replace('*', '') || '5 minutes',
            status: 'published',
            category: 'News & Insights Post'
          })
        } else {
          throw new Error('Post not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  // Intersection Observer for active section tracking
  useEffect(() => {
    if (!post || tocItems.length === 0) return

    // Wait for content to be rendered
    const timer = setTimeout(() => {
      console.log('Setting up intersection observer...')
      
      const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }

      const visibleSections = new Set<string>()

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        console.log('Observer callback triggered with', entries.length, 'entries')
        
        entries.forEach((entry) => {
          const id = entry.target.id
          console.log(`Section ${id}:`, {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            boundingRect: entry.boundingClientRect.top
          })
          
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            visibleSections.add(id)
          } else {
            visibleSections.delete(id)
          }
        })

        // Find the topmost visible section
        if (visibleSections.size > 0) {
          const headingElements = Array.from(document.querySelectorAll('h2[id], h3[id]'))
          let topMostSection = null
          let smallestTop = Infinity

          headingElements.forEach((el) => {
            if (visibleSections.has(el.id)) {
              const rect = el.getBoundingClientRect()
              if (rect.top < smallestTop && rect.top >= -100) {
                smallestTop = rect.top
                topMostSection = el.id
              }
            }
          })

          if (topMostSection) {
            console.log('Setting active section to:', topMostSection)
            setActiveSection(topMostSection)
          }
        }
      }

      const observer = new IntersectionObserver(observerCallback, observerOptions)

      // Observe all heading elements
      const headingElements = document.querySelectorAll('h2[id], h3[id]')
      console.log('Found heading elements for observation:', headingElements.length)
      
      headingElements.forEach((el, index) => {
        console.log(`Observing heading ${index + 1}:`, el.id, el.textContent?.trim())
        observer.observe(el)
      })
      
      if (headingElements.length > 0) {
        return () => {
          console.log('Cleaning up intersection observer')
          observer.disconnect()
        }
      }
    }, 1000) // Increased delay to ensure content is fully rendered

    return () => clearTimeout(timer)
  }, [post, tocItems])

  // Backup scroll listener for active section tracking
  useEffect(() => {
    if (!post || tocItems.length === 0) return

    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll('h2[id], h3[id]'))
      let activeId = ''
      let closestDistance = Infinity

      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top - 150) // 150px from top
        
        if (rect.top <= 200 && distance < closestDistance) {
          closestDistance = distance
          activeId = el.id
        }
      })

      if (activeId && activeId !== activeSection) {
        console.log('Scroll listener setting active section to:', activeId)
        setActiveSection(activeId)
      }
    }

    // Throttle scroll events
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    // Initial check
    setTimeout(handleScroll, 1500)

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [post, tocItems, activeSection])

  const scrollToSection = (id: string) => {
    // Remove immediate active state setting - let scroll tracking handle it
    
    // Find and scroll to element directly
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

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
        return <Clock className="w-4 h-4" />
      default:
        return <XCircle className="w-4 h-4" />
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
      default: return <CheckCircle className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Alan Batt Technology Hub</span>
            </div>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" asChild>
                <Link href="/content">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Repository
                </Link>
              </Button>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Content Not Found</h1>
            <p className="text-slate-600 mb-8">The content you&apos;re looking for doesn&apos;t exist or has been moved.</p>
            <Button asChild>
              <Link href="/content">Return to Repository</Link>
            </Button>
          </div>
        </main>
      </div>
    )
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
            </div>
            
            {/* Mobile Menu */}
            <MobileMenu currentPage="content" />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="text-slate-600 hover:text-slate-900">
              <Link href="/content" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Repository
              </Link>
            </Button>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            {/* Table of Contents Sidebar */}
            {tocItems.length > 0 && (
              <div className="xl:w-80 xl:flex-shrink-0">
                <div className="sticky top-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <List className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-slate-900">Table of Contents</h3>
                    </div>
                    
                    <nav className="space-y-1">
                      {tocItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`
                            block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                            ${item.level === 3 ? 'ml-4' : ''}
                            ${activeSection === item.id 
                              ? 'bg-purple-100 text-purple-800 font-medium border-l-2 border-purple-400' 
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-l-2 border-transparent'
                            }
                          `}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                    
                    <div className="mt-6 pt-4 border-t border-slate-200">
                      <div className="text-xs text-slate-500">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Current section</span>
                        </div>
                        <p>Click any heading to jump to that section. Your progress is automatically tracked.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="flex-1 min-w-0">
              {/* Article Header */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-500">{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-500">{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {getCategoryIcon(post.category)}
                      <span>{post.category}</span>
                    </div>
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                      {getStatusIcon(post.status)}
                      <span className="capitalize">{post.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                <div className="prose prose-slate prose-lg max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: () => null,
                      h2: ({ children }) => {
                        const text = children?.toString() || ''
                        const id = generateHeadingId(text)
                        return (
                          <h2 id={id} className="text-2xl font-bold text-slate-900 mb-4 mt-8 scroll-mt-8">
                            {children}
                          </h2>
                        )
                      },
                      h3: ({ children }) => {
                        const text = children?.toString() || ''
                        const id = generateHeadingId(text)
                        return (
                          <h3 id={id} className="text-xl font-semibold text-slate-900 mb-3 mt-6 scroll-mt-8">
                            {children}
                          </h3>
                        )
                      },
                      p: ({ children }) => <p className="text-slate-700 mb-4 leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">{children}</ul>,
                      strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
                      em: ({ children }) => <em className="italic text-slate-600">{children}</em>,
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-400 bg-blue-50 p-4 my-6">
                          {children}
                        </blockquote>
                      ),
                      hr: () => <hr className="border-slate-200 my-8" />
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Article Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mt-8">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-slate-900 mb-1">Found this content helpful?</h3>
                    <p className="text-sm text-slate-600">Get in touch to discuss your property needs.</p>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/content">More Content</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="mailto:hello@alanbatt.co.uk">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>&copy; 2025 Alan Batt Technology Hub. Professional property insights and analysis.</p>
      </footer>
    </div>
  )
} 