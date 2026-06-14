'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { ArrowRight, Quote } from 'lucide-react'
import Link from 'next/link'
import type { Story } from '@/lib/content-types'

const ROTATION_INTERVAL = 7000 // 7 seconds

export function ReflectionsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [stories, setStories] = useState<Story[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // Fetch published stories
  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch('/api/stories')
        const data = await response.json()
        if (data.stories && data.stories.length > 0) {
          // Shuffle the stories for random initial order
          const shuffled = [...data.stories].sort(() => Math.random() - 0.5)
          setStories(shuffled)
        }
      } catch (error) {
        console.error('Failed to fetch stories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  // Auto-rotate quotes
  const goToNext = useCallback(() => {
    if (stories.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % stories.length)
    }
  }, [stories.length])

  useEffect(() => {
    if (stories.length <= 1 || isPaused) return

    const interval = setInterval(goToNext, ROTATION_INTERVAL)
    return () => clearInterval(interval)
  }, [stories.length, isPaused, goToNext])

  // Don't render if no published stories
  if (loading) return null
  if (stories.length === 0) return null

  const currentStory = stories[currentIndex]

  return (
    <section
      ref={containerRef}
      id="reflections"
      className="relative overflow-hidden border-y border-border bg-card/50 py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-xs uppercase tracking-widest text-primary">
            Reflections from the Archive
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            In their own words
          </h2>
        </motion.div>

        {/* Quote Display */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-center"
            >
              {/* Quote Icon */}
              <div className="mb-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Quote className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* The Quote */}
              <blockquote className="mx-auto max-w-3xl">
                <p className="font-serif text-2xl font-medium leading-relaxed text-foreground sm:text-3xl lg:text-4xl">
                  &ldquo;{currentStory.quote}&rdquo;
                </p>
              </blockquote>

              {/* Attribution */}
              <div className="mt-8">
                <p className="font-semibold text-foreground">{currentStory.name}</p>
                <p className="text-sm text-muted-foreground">{currentStory.role}</p>
                {currentStory.location && (
                  <p className="mt-1 text-xs text-muted-foreground/70">{currentStory.location}</p>
                )}
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {currentStory.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Dashes */}
        {stories.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex justify-center gap-2"
          >
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </motion.div>
        )}

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
  )
}
