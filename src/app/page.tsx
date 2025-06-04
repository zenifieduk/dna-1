"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sparkles, Palette, Zap, Bot, Github, ArrowRight, Users, Target, Lightbulb } from "lucide-react"
import { MobileMenu } from "@/components/ui/mobile-menu"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
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
            <MobileMenu currentPage="home" />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Above the fold content */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 mb-6">
                <Lightbulb className="h-4 w-4 mr-2" />
                Innovative Client Communication Platform
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              <span className="text-primary">Magicalogical</span>
              <span className="block text-2xl md:text-3xl font-normal text-muted-foreground mt-2">
                Alan Batt Tech Dev Mini-site
              </span>
            </h1>
            
            {/* Professional Explainer */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                Welcome to a revolutionary approach in client-developer collaboration
              </p>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 md:p-12 text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                  Redefining Development Communication
                </h2>
                
                <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                  <p className="mb-6">
                    This mini-site represents Magicalogical&apos;s pioneering approach to showcasing development capabilities 
                    directly to our valued clients. Rather than traditional project documentation, we&apos;ve created an 
                    interactive platform that demonstrates our expertise in real-time.
                  </p>
                  
                  <p className="mb-6">
                    From advanced AI integrations and voice technology to cutting-edge content creation tools, 
                    this platform showcases everything we&apos;re building to keep your operations at the forefront 
                    of modern technology. Each section demonstrates live capabilities, allowing you to experience 
                    first-hand how these innovations can transform and scale your business operations.
                  </p>
                  
                  <p className="mb-8">
                    This represents our commitment to transparency, innovation, and ensuring our clients understand 
                    not just what we&apos;re building, but how it will revolutionise their competitive advantage in an 
                    increasingly digital marketplace.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Client-Centric</h4>
                        <p className="text-sm text-blue-700">Direct capability demonstration</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                      <Target className="h-6 w-6 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-900">Innovation Focused</h4>
                        <p className="text-sm text-green-700">Cutting-edge technology showcase</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                      <Zap className="h-6 w-6 text-purple-600" />
                      <div>
                        <h4 className="font-semibold text-purple-900">Scalable Solutions</h4>
                        <p className="text-sm text-purple-700">Built for operational growth</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-base px-8" asChild>
                <Link href="/ai">
                  <Bot className="h-4 w-4 mr-2" />
                  Explore AI Capabilities
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8" asChild>
                <Link href="/new-dev">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  View Development Portfolio
                </Link>
              </Button>
            </div>
          </div>

          {/* Below the fold - Technical Showcase */}
          <div className="border-t border-slate-200 pt-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-slate-900">
                Technical Foundation
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Built with modern technologies and frameworks to ensure performance, scalability, and maintainability.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Built with Next.js 15 and optimised for performance with the latest React features.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Beautiful Design</h3>
                <p className="text-muted-foreground">
                  Tailwind CSS v4 with a comprehensive design system and dark mode support.
                </p>
              </div>
              
              <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Powered</h3>
                <p className="text-muted-foreground">
                  Experience our AI agents with ElevenLabs voice technology integration.
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="p-8 rounded-lg border bg-card text-card-foreground shadow-sm max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Technology Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                  <span className="font-semibold">Next.js 15</span>
                  <span className="text-muted-foreground">React Framework</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                  <span className="font-semibold">Tailwind v4</span>
                  <span className="text-muted-foreground">CSS Framework</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                  <span className="font-semibold">TypeScript</span>
                  <span className="text-muted-foreground">Type Safety</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
                  <span className="font-semibold">ElevenLabs</span>
                  <span className="text-muted-foreground">Voice AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500 mt-20">
        <p>&copy; 2024 Magicalogical. Revolutionising client-developer collaboration through innovative technology demonstration.</p>
      </footer>
    </div>
  )
}
