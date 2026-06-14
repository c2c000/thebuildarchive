'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { X, Plus, Minus, ChevronRight, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContent } from '@/lib/content-context'
import type { DissectedObject } from '@/lib/content-types'

export function DissectedSection() {
  const { dissectedObjects } = useContent()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedObject, setSelectedObject] = useState<DissectedObject | null>(null)
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null)

  if (dissectedObjects.length === 0) {
    return (
      <section id="dissected" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-muted-foreground">No dissected objects available.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="dissected" ref={containerRef} className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="mb-4 inline-block text-xs uppercase tracking-widest text-primary">
              Dissected
            </span>
            <h2 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
              How things work.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Take apart everyday objects. See what&apos;s inside. Engineering is just understanding
              how pieces fit together. Click any object to explore its components.
            </p>
          </motion.div>

          {/* Object Preview Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {dissectedObjects.map((obj, index) => (
              <motion.button
                key={obj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                onClick={() => {
                  setSelectedObject(obj)
                  setActiveAnnotation(null)
                }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary/50 hover:shadow-lg"
              >
                {/* Preview illustration area */}
                <div className="relative mb-6 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-secondary via-card to-background">
                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: '15px 15px',
                    }}
                  />
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Wrench className="h-10 w-10" />
                    </div>
                  </div>

                  {/* Hotspot indicators */}
                  {obj.hotspots.slice(0, 4).map((hotspot, i) => (
                    <div
                      key={hotspot.id}
                      className="absolute h-3 w-3 rounded-full border-2 border-primary bg-card transition-all group-hover:scale-125"
                      style={{ 
                        left: `${hotspot.x}%`, 
                        top: `${hotspot.y}%`,
                        transform: 'translate(-50%, -50%)',
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>

                {/* Object info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
                      {obj.name}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {obj.description}
                    </p>
                  </div>
                  <div className="ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>

                {/* Component count */}
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2 py-1">
                    {obj.hotspots.length} components
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Full View Modal */}
      <AnimatePresence>
        {selectedObject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm sm:p-6"
            onClick={() => setSelectedObject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-xl border border-border bg-card"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-6 py-4 backdrop-blur-sm">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    {selectedObject.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedObject.hotspots.length} components to explore
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedObject(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid gap-8 p-6 lg:grid-cols-5">
                {/* Main visual */}
                <div className="lg:col-span-3">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-gradient-to-br from-secondary via-card to-background">
                    {/* Grid pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* Center illustration placeholder */}
                    <div className="absolute inset-8 flex items-center justify-center">
                      <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-border/50 bg-secondary/20">
                        <div className="text-center">
                          <Wrench className="mx-auto mb-2 h-16 w-16 text-muted-foreground/50" />
                          <span className="text-lg font-medium text-muted-foreground">{selectedObject.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Annotation points */}
                    {selectedObject.hotspots.map((hotspot, index) => (
                      <motion.button
                        key={hotspot.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() =>
                          setActiveAnnotation(activeAnnotation === hotspot.id ? null : hotspot.id)
                        }
                        className="group absolute"
                        style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                      >
                        <span
                          className={`flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all ${
                            activeAnnotation === hotspot.id
                              ? 'border-primary bg-primary text-primary-foreground scale-110'
                              : 'border-border bg-card text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground'
                          }`}
                        >
                          {activeAnnotation === hotspot.id ? (
                            <Minus className="h-5 w-5" />
                          ) : (
                            <Plus className="h-5 w-5" />
                          )}
                        </span>
                        {/* Label on hover */}
                        <span className="absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-card px-3 py-1.5 text-sm font-medium text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 border border-border">
                          {hotspot.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Sidebar info */}
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
                      About this object
                    </h3>
                    <p className="text-muted-foreground">{selectedObject.description}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Components
                    </h4>
                  </div>

                  {/* Annotation details */}
                  <div className="space-y-3">
                    {selectedObject.hotspots.map((hotspot) => (
                      <motion.div
                        key={hotspot.id}
                        layout
                        className={`rounded-lg border p-4 transition-all cursor-pointer ${
                          activeAnnotation === hotspot.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-secondary/30 hover:border-primary/50'
                        }`}
                        onClick={() =>
                          setActiveAnnotation(activeAnnotation === hotspot.id ? null : hotspot.id)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{hotspot.label}</span>
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                            activeAnnotation === hotspot.id 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-card text-muted-foreground'
                          }`}>
                            {activeAnnotation === hotspot.id ? (
                              <Minus className="h-3 w-3" />
                            ) : (
                              <Plus className="h-3 w-3" />
                            )}
                          </span>
                        </div>
                        <AnimatePresence>
                          {activeAnnotation === hotspot.id && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 text-sm leading-relaxed text-muted-foreground"
                            >
                              {hotspot.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  {selectedObject.hotspots.length === 0 && (
                    <p className="text-sm text-muted-foreground">No components defined for this object yet.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
