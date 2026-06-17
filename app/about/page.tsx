'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Film, Archive, Cpu, Wrench, User, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContent } from '@/lib/content-context'

function SectionDivider() {
  return (
    <div className="mx-auto my-16 flex w-full max-w-xs items-center justify-center gap-4">
      <div className="h-px flex-1 bg-border" />
      <div className="h-2 w-2 rotate-45 border border-border" />
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

const partIcons = [Film, Archive, Cpu, Wrench]

export default function AboutPage() {
  const { siteContent } = useContent()

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  const coreRef = useRef<HTMLDivElement>(null)
  const coreInView = useInView(coreRef, { once: true, margin: '-100px' })

  const partsRef = useRef<HTMLDivElement>(null)
  const partsInView = useInView(partsRef, { once: true, margin: '-100px' })

  const messageRef = useRef<HTMLDivElement>(null)
  const messageInView = useInView(messageRef, { once: true, margin: '-100px' })

  const founderRef = useRef<HTMLDivElement>(null)
  const founderInView = useInView(founderRef, { once: true, margin: '-100px' })

  const parts = [
    {
      number: '01',
      title: siteContent.aboutPart1Title,
      icon: Film,
      description: siteContent.aboutPart1Description,
      structure: [
        { act: siteContent.aboutPart1Act1, desc: siteContent.aboutPart1Act1Desc },
        { act: siteContent.aboutPart1Act2, desc: siteContent.aboutPart1Act2Desc },
        { act: siteContent.aboutPart1Act3, desc: siteContent.aboutPart1Act3Desc },
      ],
    },
    {
      number: '02',
      title: siteContent.aboutPart2Title,
      icon: Archive,
      description: siteContent.aboutPart2Description,
      structure: null,
    },
    {
      number: '03',
      title: siteContent.aboutPart3Title,
      icon: Cpu,
      description: siteContent.aboutPart3Description,
      features: [
        'Minimal jargon',
        'Visual step-by-step onboarding',
        'Community discussion board',
        'Multiple STEM career paths',
        'Free resources only',
        'Open source',
      ],
    },
    {
      number: '04',
      title: siteContent.aboutPart4Title,
      icon: Wrench,
      subtitle: siteContent.aboutPart4Subtitle,
      description: siteContent.aboutPart4Description,
      question: siteContent.aboutPart4Question,
    },
  ]

  const dissectedLooksLikeItems = siteContent.aboutDissectedLooksLikeList?.split('|') || []

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

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              {siteContent.aboutTagline}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl"
          >
            {siteContent.aboutTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {siteContent.aboutSubtitle}
          </motion.p>
        </div>
      </section>

      {/* The Core Idea */}
      <section ref={coreRef} className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={coreInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            <div className="pl-8">
              <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                {siteContent.aboutCoreIdeaTitle}
              </h2>

              <div className="mt-8 space-y-6">
                <p className="text-lg leading-relaxed text-foreground">
                  <span className="font-semibold">{siteContent.aboutCoreIdeaText1}</span>
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  <em>{siteContent.aboutCoreIdeaText2}</em>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
<motion.p
            className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl mt-12 rounded-2xl border border-border bg-card p-12 text-center"
          >
            Research cited by Nevada STEM leaders found that about 1 in 3 children lose interest in science by fourth grade. Additionally, Nevada reported that only 38% of elementary schools offered dedicated STEM instruction during the school day, highlighting the need for stronger early STEM exposure.
          </motion.p>
          
      <SectionDivider />

      {/* Four Interlocking Parts */}
      <section ref={partsRef} className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={partsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              {siteContent.aboutPartsTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {siteContent.aboutPartsSubtitle}
            </p>
          </motion.div>

          <div className="space-y-16">
            {parts.map((part, index) => (
              <motion.div
                key={part.number}
                initial={{ opacity: 0, y: 50 }}
                animate={partsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="grid gap-8 lg:grid-cols-12">
                  {/* Number and Icon */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                      <span className="font-mono text-4xl font-bold text-primary/20">
                        {part.number}
                      </span>
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <part.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-10">
                    <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        {part.title}
                      </h3>
                      {part.subtitle && (
                        <p className="mt-1 text-sm font-medium text-primary">
                          {part.subtitle}
                        </p>
                      )}

                      <p className="mt-4 text-muted-foreground leading-relaxed">
                        {part.description}
                      </p>

                      {/* Documentary Structure */}
                      {part.structure && (
                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                          {part.structure.map((item, i) => (
                            <div
                              key={i}
                              className="rounded-lg bg-muted/50 p-4"
                            >
                              <p className="font-semibold text-foreground">{item.act}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Entry Lab Features */}
                      {part.features && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {part.features.map((feature, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Dissected Question */}
                      {part.question && (
                        <blockquote className="mt-6 border-l-4 border-accent pl-4 italic text-foreground">
                          {part.question}
                        </blockquote>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Dissected Deeper */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              {siteContent.aboutDissectedTitle}
            </h2>

            <div className="mt-8 space-y-6 text-muted-foreground">
              <p className="leading-relaxed">
                {siteContent.aboutDissectedText}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="font-semibold text-foreground">{siteContent.aboutDissectedLooksLike}</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {dissectedLooksLikeItems.map((item, i) => (
                      <li key={i}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="font-semibold text-foreground">{siteContent.aboutDissectedTheme}</p>
                  <p className="mt-3 text-sm">
                    {siteContent.aboutDissectedThemeText}
                  </p>
                  <p className="mt-2 text-sm font-medium text-primary">
                    {siteContent.aboutDissectedThemeHighlight}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section ref={founderRef} className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={founderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              {siteContent.founderSectionTitle}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={founderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl border border-border bg-card p-8 sm:p-12"
          >
            <div className="grid gap-8 md:grid-cols-3">
              {/* Avatar/Image */}
              <div className="flex flex-col items-center md:items-start">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
                  {siteContent.founderImage ? (
                    <img
                      src={siteContent.founderImage}
                      alt={siteContent.founderName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-14 w-14" />
                  )}
                </div>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {siteContent.founderName}
                  </h3>
                  <p className="text-sm text-primary">{siteContent.founderRole}</p>
                </div>
              </div>

              {/* Bio and Quote */}
              <div className="md:col-span-2">
                <p className="leading-relaxed text-muted-foreground">
                  {siteContent.founderBio}
                </p>

                <div className="mt-8 border-l-4 border-primary pl-6">
                  <Quote className="mb-2 h-6 w-6 text-primary/40" />
                  <p className="font-serif text-lg italic text-foreground">
                    &ldquo;{siteContent.founderQuote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* The Unifying Message */}
      <section ref={messageRef} className="py-32">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={messageInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl border border-border bg-card p-12 text-center shadow-xl sm:p-16"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-block rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">
                {siteContent.aboutUnifyingLabel}
              </span>
            </div>

            <p className="font-serif text-2xl font-medium leading-relaxed text-foreground sm:text-3xl">
              {siteContent.aboutUnifyingMessage}
            </p>

            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
              {siteContent.aboutUnifyingSubtext}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/#documentary">
                <Button className="group gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Watch the Documentary
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link href="/#entry-lab">
                <Button variant="outline" className="gap-2">
                  Start Learning
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

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
