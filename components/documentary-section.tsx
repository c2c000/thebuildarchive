'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'
import { Button } from '@/components/ui/button'

const chapters = [
  {
    id: 1,
    title: 'The Dream',
    time: '0:00',
    description: 'What draws people to engineering? The promise of creation.',
    quote: '"I wanted to build things that changed how people lived."',
    active: true,
  },
  {
    id: 2,
    title: 'The Reality',
    time: '12:34',
    description: 'The barriers nobody talks about. Cost. Culture. Gatekeeping.',
    quote: '"I was told I didn\'t have the right background."',
    active: false,
  },
  {
    id: 3,
    title: 'The Rewrite',
    time: '28:15',
    description: 'Redesigning the entry point. Making space for everyone.',
    quote: '"We can build a different system."',
    active: false,
  },
]

export function DocumentarySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeChapter, setActiveChapter] = useState(1)

  return (
    <section id="documentary" ref={containerRef} className="relative py-16 bg-card/30">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="mb-2 inline-block text-xs uppercase tracking-widest text-primary">
            The Documentary
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Three acts. One question.
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="group relative aspect-video overflow-hidden rounded-lg bg-secondary">
              {/* Video placeholder with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="ml-1 h-6 w-6" />}
                </motion.button>
              </div>

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-1/3 rounded-full bg-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="ml-0.5 h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                    <span className="text-xs text-muted-foreground">12:34 / 42:15</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quote overlay */}
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <blockquote className="border-l-2 border-primary pl-3">
                <p className="font-serif text-base italic text-foreground">
                  {chapters.find((c) => c.id === activeChapter)?.quote}
                </p>
              </blockquote>
            </motion.div>
          </motion.div>

          {/* Chapter Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Chapters
            </h3>
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => setActiveChapter(chapter.id)}
                className={`block w-full rounded-lg border p-3 text-left transition-all ${
                  activeChapter === chapter.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Act {chapter.id}</span>
                  <span className="text-xs text-muted-foreground">{chapter.time}</span>
                </div>
                <h4 className="mb-0.5 text-sm font-semibold text-foreground">{chapter.title}</h4>
                <p className="text-xs text-muted-foreground">{chapter.description}</p>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
