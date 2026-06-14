'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Send, X, ArrowRight, MapPin, Calendar, Briefcase, Search, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Story } from '@/lib/content-types'

const filters = ['All', 'Burnout', 'Cost', "Didn't Belong", 'First-Gen', 'Systemic', 'Access']

export function StoryArchive() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [stories, setStories] = useState<Story[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

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

  return (
    <>
      <section ref={containerRef} className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="mb-4 inline-block text-xs uppercase tracking-widest text-primary">
              The Archive
            </span>
            <div className="flex flex-wrap items-baseline gap-4">
              <h2 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
                Real stories. Real barriers.
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

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search stories by name, role, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm transition-all ${activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Stories Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredStories.map((story, index) => (
                  <motion.button
                    key={story.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedStory(story)}
                    className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 text-left transition-all hover:border-primary/50"
                  >
                    {/* Avatar placeholder */}
                    <div className="mb-4 flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-primary/30 to-accent/30">
                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-foreground/50">
                          {story.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{story.name}</h3>
                        <p className="text-sm text-muted-foreground">{story.role}</p>
                      </div>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-1">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="font-serif text-sm italic text-muted-foreground">
                      &quot;{story.quote}&quot;
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Read full story <ArrowRight className="h-4 w-4" />
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredStories.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No stories found with this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-6 backdrop-blur-sm"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-8"
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
                <div className="h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-primary/30 to-accent/30">
                  {selectedStory.profileImage ? (
                    <img
                      src={selectedStory.profileImage}
                      alt={selectedStory.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-foreground/50">
                      {selectedStory.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{selectedStory.name}</h3>
                  <p className="text-muted-foreground">{selectedStory.role}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedStory.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Story meta */}
              <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                {selectedStory.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedStory.location}
                  </span>
                )}
                {selectedStory.age && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Age {selectedStory.age}
                  </span>
                )}
              </div>

              <blockquote className="mb-6 border-l-2 border-primary pl-4">
                <p className="font-serif text-xl italic text-foreground">
                  &quot;{selectedStory.quote}&quot;
                </p>
              </blockquote>

              <p className="mb-6 leading-relaxed text-muted-foreground">{selectedStory.fullStory}</p>

              {selectedStory.currentStatus && (
                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <div className="mb-1 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Briefcase className="h-4 w-4" />
                    Now
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedStory.currentStatus}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
