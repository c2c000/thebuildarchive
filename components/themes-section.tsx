'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DollarSign, Heart, Users, TrendingDown } from 'lucide-react'

const themes = [
  {
    icon: DollarSign,
    title: 'Cost',
    stat: '73%',
    description: 'of students cite financial barriers as the primary reason for leaving STEM programs',
  },
  {
    icon: Heart,
    title: 'Belonging',
    stat: '1 in 3',
    description:
      'underrepresented students report feeling like they "don\'t belong" in engineering',
  },
  {
    icon: Users,
    title: 'Access',
    stat: '85%',
    description: 'of engineering schools lack accessible entry paths for first-gen students',
  },
  {
    icon: TrendingDown,
    title: 'Dropout',
    stat: '50%',
    description:
      'of STEM students leave their major before graduating, with higher rates among minorities',
  },
]

export function ThemesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section ref={containerRef} className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            The system is filtering people out
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            These are not individual failures. These are systemic barriers.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-all hover:border-primary/50"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />
              <theme.icon className="relative z-10 mb-4 h-8 w-8 text-primary" />
              <h3 className="relative z-10 mb-2 text-lg font-semibold text-foreground">
                {theme.title}
              </h3>
              <p className="relative z-10 mb-4 font-serif text-4xl font-bold text-primary">
                {theme.stat}
              </p>
              <p className="relative z-10 text-sm text-muted-foreground">{theme.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
