'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useContent } from '@/lib/content-context'

export function StayUpdatedSection() {
  const { siteContent } = useContent()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to subscribe')
        return
      }

      setIsSubmitted(true)
      setEmail('')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section ref={containerRef} className="relative border-t border-border bg-secondary/50 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {siteContent.stayUpdatedTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {siteContent.stayUpdatedDescription}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-10"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">You&apos;re on the list.</p>
                <p className="text-sm text-muted-foreground">We&apos;ll be in touch when something real launches.</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 rounded-xl border-border bg-card px-5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-14 gap-2 rounded-xl bg-accent px-8 text-accent-foreground hover:bg-accent/90"
              >
                {isLoading ? 'Joining...' : siteContent.stayUpdatedButtonText}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.form>

        {!isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4"
          >
            {error && (
              <p className="mb-2 text-sm text-destructive">{error}</p>
            )}
            <p className="text-sm text-muted-foreground">
              {siteContent.stayUpdatedDisclaimer}
            </p>
          </motion.div>
        )}

        {/* Section Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-8"
        >
          <a href="#documentary" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Documentary
          </a>
          <a href="#stories" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Archive
          </a>
          <a href="#careers" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Paths
          </a>
          <a href="#entry-lab" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Entry Lab
          </a>
          <a href="#dissected" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Dissected
          </a>
        </motion.div>
      </div>
    </section>
  )
}
