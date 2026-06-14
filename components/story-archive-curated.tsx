'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContent } from '@/lib/content-context'
import type { Story } from '@/lib/content-types'

export function StoryArchiveCurated() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [stories, setStories] = useState<Story[]>([])
  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch('/api/stories')
        const data = await response.json()
        if (data.stories) {
          setStories(data.stories)
          setTotalCount(data.totalCount || data.stories.length)
        }
      } catch (error) {
        console.error('Failed to fetch stories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  const filteredStories = useMemo(() => {
    let result = stories

    // Filter by tag
    if (activeFilter !== 'All') {
      result = result.filter((story) => story.tags.includes(activeFilter))
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (story) =>
          story.name.toLowerCase().includes(query) ||
          story.role.toLowerCase().includes(query) ||
          story.quote.toLowerCase().includes(query) ||
          story.fullStory.toLowerCase().includes(query) ||
          story.location?.toLowerCase().includes(query) ||
          story.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return result
  }, [stories, activeFilter, searchQuery])
  // Show up to 5 stories (skip first which is featured)
  const archiveStories = stories.slice(0, 6)

  return (
    <>
      <section id="stories" ref={containerRef} className="relative py-32 lg:py-48">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <span className="mb-6 inline-block font-mono text-xs tracking-[0.2em] text-primary">
              THE ARCHIVE
            </span>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h2 className="max-w-xl font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Individual stories turned into collective evidence.

              </h2>
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-lg font-semibold text-primary">
                {totalCount} {totalCount === 1 ? 'story' : 'stories'}
              </span>
            </div>
            <div className="mt-6 max-w-2xl rounded-lg border border-border bg-card/50 p-4">
              <p className="font-medium text-foreground">
                The archive is incomplete without you. &nbsp;&nbsp;&nbsp;
                <a href="/submit">
                  <Button
                    size="sm"
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                    Tell Your Story
                  </Button>
                </a>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every experience matters. Whether you faced barriers, found unexpected support, or are still navigating your path—your story could help someone else feel less alone.
              </p>
            </div>
          </motion.div>

          {/* Editorial grid - asymmetrical */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {archiveStories.map((story, index) => {
              // Create asymmetrical layout
              const isLarge = index === 0 || index === 3
              const gridClass = isLarge ? 'md:col-span-2 lg:col-span-2' : ''

              return (
                <motion.button
                  key={story.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  onClick={() => setSelectedStory(story)}
                  className={`group relative overflow-hidden rounded-lg border border-border bg-card p-8 text-left transition-all hover:border-primary/50 hover:bg-card/80 ${gridClass}`}
                >
                  {/* Background accent */}
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-lg font-medium text-foreground">
                        {story.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{story.name}</h3>
                        <p className="text-sm text-muted-foreground">{story.role}</p>
                      </div>
                    </div>

                    <blockquote
                      className={`font-serif italic text-muted-foreground ${isLarge ? 'text-lg sm:text-xl' : 'text-base'
                        }`}
                    >
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {story.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      <span>Read story</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
          {/* Read All Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Read all {stories.length} stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Story Modal */}
      {selectedStory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-6 backdrop-blur-sm"
          onClick={() => setSelectedStory(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setSelectedStory(null)}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-xl font-medium text-foreground">
                {selectedStory.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{selectedStory.name}</h3>
                <p className="text-muted-foreground">{selectedStory.role}</p>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {selectedStory.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <blockquote className="mb-6 border-l-2 border-primary pl-4">
              <p className="font-serif text-xl italic text-foreground">
                &ldquo;{selectedStory.quote}&rdquo;
              </p>
            </blockquote>

            <p className="leading-relaxed text-muted-foreground">{selectedStory.fullStory}</p>

            {selectedStory.currentStatus && (
              <div className="mt-6 rounded-lg bg-secondary/50 p-4">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Now
                </span>
                <p className="mt-1 text-sm text-foreground">{selectedStory.currentStatus}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}