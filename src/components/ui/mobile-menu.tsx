"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X, ChevronRight, ChevronDown, Github, Phone, Bot, FileText, Code, BarChart3, Search, Download, TrendingUp } from "lucide-react"
import { LucideIcon } from 'lucide-react'

interface MobileMenuProps {
  currentPage?: string
}

interface MenuItem {
  href: string
  label: string
  icon?: LucideIcon
  description?: string
  active?: boolean
}

interface MenuSection {
  id: string
  title: string
  expandable?: boolean
  items: MenuItem[]
}

export function MobileMenu({ currentPage }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const menuSections: MenuSection[] = [
    {
      id: 'main',
      title: 'MAIN NAVIGATION',
      items: [
        { href: '/', label: 'Home', icon: Sparkles, active: currentPage === 'home' },
        { href: '/ai', label: 'AI', icon: Bot, active: currentPage === 'ai' },
        { href: '/content', label: 'Content', icon: FileText, active: currentPage === 'content' },
        { href: '/new-dev', label: 'New Dev', icon: Code, active: currentPage === 'new-dev' },
        { href: '/reports', label: 'Reports', icon: BarChart3, active: currentPage === 'reports' },
        { href: '/seo', label: 'SEO', icon: Search, active: currentPage === 'seo' },
        { href: '/markets', label: 'Markets', icon: TrendingUp, active: currentPage === 'markets' },
        { href: '/downloads', label: 'Downloads', icon: Download, active: currentPage === 'downloads' },
      ]
    },
    {
      id: 'ai',
      title: 'AI SERVICES',
      expandable: true,
      items: [
        { href: '/ai', label: 'View All AI Services', description: 'Complete AI solutions overview' },
        { href: '/ai#ellie', label: 'Conversational AI - Ellie', description: 'Voice booking agent' },
        { href: '/ai#trevor', label: 'Classic Car Expert - Trevor', description: 'Specialized chatbot' },
        { href: '/ai', label: 'AI Integration Consulting', description: 'Custom AI implementations' },
      ]
    },
    {
      id: 'development',
      title: 'DEVELOPMENT',
      expandable: true,
      items: [
        { href: '/new-dev', label: 'View All Development', description: 'Latest projects and prototypes' },
        { href: '/new-dev', label: 'Next.js Applications', description: 'Modern React frameworks' },
        { href: '/new-dev', label: 'AI Integration', description: 'ElevenLabs and OpenAI' },
        { href: '/new-dev', label: 'Performance Optimization', description: 'Speed and efficiency' },
      ]
    }
  ]

  return (
    <>
      {/* Mobile Menu Button - Hidden on desktop */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="lg:hidden flex items-center"
        aria-label="Open mobile menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white/95 backdrop-blur-lg shadow-xl border-l border-slate-200">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-slate-900">Alan Batt</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeMenu}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Menu content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {menuSections.map((section) => (
                  <div key={section.id} className="space-y-2">
                    {/* Section header */}
                    {section.expandable ? (
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="flex items-center justify-between w-full text-left text-sm font-semibold text-slate-700 uppercase tracking-wide"
                      >
                        {section.title}
                        {expandedSection === section.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    ) : (
                      <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        {section.title}
                      </div>
                    )}

                    {/* Section items */}
                    {(!section.expandable || expandedSection === section.id) && (
                      <div className="space-y-1">
                        {section.items.map((item, index) => (
                          <Link
                            key={index}
                            href={item.href}
                            onClick={closeMenu}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                              item.active 
                                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {item.icon && <item.icon className="h-5 w-5 flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium">{item.label}</div>
                              {item.description && (
                                <div className="text-sm text-slate-500 mt-1">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer actions */}
              <div className="p-4 border-t border-slate-200 space-y-3">
                <Link
                  href="https://github.com/zenifieduk/alan-batt"
                  target="_blank"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 p-3 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="font-medium">GitHub Repository</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 ml-auto" />
                </Link>
                
                <Button 
                  onClick={closeMenu}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 