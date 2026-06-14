'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Heart } from 'lucide-react'
import { useContent } from '@/lib/content-context'
import type { Sponsor } from '@/lib/content-types'

const tierLabels: Record<Sponsor['tier'], string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  community: 'Community',
}

const tierOrder: Sponsor['tier'][] = ['platinum', 'gold', 'silver', 'community']

export function SponsorsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { sponsors, thankYous, siteContent } = useContent()

  // Hidden when empty: if no sponsors and no thank yous, render nothing
  if (sponsors.length === 0 && thankYous.length === 0) {
    return null
  }

  const sortedSponsors = [...sponsors].sort(
    (a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier)
  )

  return (
    <section id="sponsors" ref={containerRef} className="border-t border-border bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-xs uppercase tracking-widest text-primary">
            Made Possible By
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {siteContent.sponsorsTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty">
            {siteContent.sponsorsSubtitle}
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        {sortedSponsors.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedSponsors.map((sponsor, index) => {
              const CardContent = (
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                      {tierLabels[sponsor.tier]}
                    </span>
                    {sponsor.url && (
                      <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground">{sponsor.name}</h3>
                  {sponsor.description && (
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{sponsor.description}</p>
                  )}
                </div>
              )

              return (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  {sponsor.url ? (
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {CardContent}
                    </a>
                  ) : (
                    CardContent
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Thank Yous */}
        {thankYous.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={sortedSponsors.length > 0 ? 'mt-16' : ''}
          >
            <div className="mb-8 flex items-center justify-center gap-2 text-center">
              <Heart className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {siteContent.thankYousTitle}
              </h3>
            </div>
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
              {thankYous.map((thankYou, index) => (
                <motion.div
                  key={thankYou.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <div className="font-semibold text-foreground">{thankYou.name}</div>
                  {thankYou.note && (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{thankYou.note}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
