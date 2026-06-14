'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Send, X, ArrowRight, ArrowLeft, MapPin, Calendar, Briefcase, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Story } from '@/lib/content-types'
import Link from 'next/link'
import { StoryArchive } from '@/components/story-archive'

const filters = ['All', 'Burnout', 'Cost', "Didn't Belong", 'First-Gen', 'Systemic', 'Access']

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-foreground">
              The Build Archive
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </nav>
      </header>
      <StoryArchive />
      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link href="/" className="text-xl font-semibold text-foreground">
              Who Gets to Build<span className="text-primary">?</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A project about access, identity, and engineering.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}