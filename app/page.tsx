'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { ThemesSection } from '@/components/themes-section'
import { DocumentarySection } from '@/components/documentary-section'
import { StoryArchive } from '@/components/story-archive'
import { StorySubmission } from '@/components/story-submission'
import { StemCareersSection } from '@/components/stem-careers-section'
import { EntryLabSection } from '@/components/entry-lab-section'
import { DissectedSection } from '@/components/dissected-section'
import { ReflectionsSection } from '@/components/reflections-section'
import { StayUpdatedSection } from '@/components/stay-updated-section'
import { Footer } from '@/components/footer'
import { ScrollToExplore } from '@/components/scroll-to-explore'
import { useContent } from '@/lib/content-context'
import { ArrowRight, Play, Users, Briefcase, Cpu, Layers } from 'lucide-react'
import { StoryArchiveCurated } from '@/components/story-archive-curated'

const sectionIcons = {
  documentary: Play,
  stories: Users,
  careers: Briefcase,
  entryLab: Cpu,
  dissected: Layers,
}

export default function Home() {
  const { siteContent } = useContent()

  const sections = [
    {
      href: '#stories',
      title: siteContent.storiesTitle,
      subtitle: siteContent.storiesSubtitle,
      description: siteContent.storiesDescription,
      icon: sectionIcons.stories,
      color: 'bg-accent',
      featured: true,
    },
    {
      href: '#entry-lab',
      title: siteContent.entryLabTitle,
      subtitle: siteContent.entryLabSubtitle,
      description: siteContent.entryLabDescription,
      icon: sectionIcons.entryLab,
      color: 'bg-chart-4',
    },
    {
      href: '#dissected',
      title: siteContent.dissectedTitle,
      subtitle: siteContent.dissectedSubtitle,
      description: siteContent.dissectedDescription,
      icon: sectionIcons.dissected,
      color: 'bg-chart-5',
    },
    {
      href: '#documentary',
      title: siteContent.documentaryTitle,
      subtitle: siteContent.documentarySubtitle,
      description: siteContent.documentaryDescription,
      icon: sectionIcons.documentary,
      color: 'bg-primary',
    },
    {
      href: '#careers',
      title: siteContent.careersTitle,
      subtitle: siteContent.careersSubtitle,
      description: siteContent.careersDescription,
      icon: sectionIcons.careers,
      color: 'bg-chart-3',
    },
  ]

  const stats = [
    { value: siteContent.stat1Value, label: siteContent.stat1Label },
    { value: siteContent.stat2Value, label: siteContent.stat2Label },
    { value: siteContent.stat3Value, label: siteContent.stat3Label },
    { value: siteContent.stat4Value, label: siteContent.stat4Label },
  ]

  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground">
              {siteContent.heroTagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-7xl md:text-8xl"
          >
            <span className="text-balance">
              {siteContent.heroTitle.includes('build') ? (
                <>
                  {siteContent.heroTitle.split('build')[0]}
                  <span className="relative">
                    <span className="relative z-10 text-primary">build</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="absolute bottom-2 left-0 -z-0 h-3 w-full origin-left bg-primary/20"
                    />
                  </span>
                  {siteContent.heroTitle.split('build')[1]}
                </>
              ) : (
                siteContent.heroTitle
              )}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            <span className="text-pretty">{siteContent.heroSubtitle}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#entry-lab"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              {siteContent.heroCta1}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#stories"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-8 py-3 text-sm font-medium text-foreground transition-all hover:bg-card"
            >
              {siteContent.heroCta2}
            </a>
          </motion.div>
        </div>
      </section>
      <ReflectionsSection />
      {/* Stats Section */}
      <section className="border-y border-border bg-card/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {siteContent.statsTitle}
            </h2>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-4xl font-bold text-primary sm:text-5xl">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section id="explore" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              {siteContent.sectionsTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {siteContent.sectionsSubtitle}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
              <motion.div
                key={section.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={section.featured ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <a href={section.href} className="group block h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                    <div
                      className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${section.color} text-white`}
                    >
                      <section.icon className="h-7 w-7" />
                    </div>

                    <span className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {section.subtitle}
                    </span>

                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      {section.title}
                    </h3>

                    <p className="mt-3 flex-1 text-muted-foreground">{section.description}</p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>

                    {section.featured && (
                      <div className="absolute right-4 top-4 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        Featured
                      </div>
                    )}
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <ThemesSection />

      {/* Render sections in order based on siteContent.sectionOrder, excluding hidden ones */}
      {(() => {
        const hiddenSections = (siteContent.hiddenSections || '').split(',').map(s => s.trim()).filter(Boolean)
        return (siteContent.sectionOrder || 'documentary,stories,careers,entry-lab,dissected')
          .split(',')
          .map((sectionId) => sectionId.trim())
          .filter((sectionId) => !hiddenSections.includes(sectionId))
          .map((sectionId) => {
            switch (sectionId) {

              case 'documentary':
                return <DocumentarySection key="documentary" />
              case 'stories':
                return <StoryArchiveCurated key="stories" />
              case 'careers':
                return <StemCareersSection key="careers" />
              case 'entry-lab':
                return <EntryLabSection key="entry-lab" />
              case 'dissected':
                return <DissectedSection key="dissected" />
              default:
                return null
            }
          })
      })()}

      {/* Mission Statement */}
      <section className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="font-serif text-2xl font-medium leading-relaxed text-foreground sm:text-3xl">
              &ldquo;{siteContent.missionQuote}&rdquo;
            </blockquote>
            <div className="mt-8">
              <div className="text-sm font-semibold text-foreground">{siteContent.missionLabel}</div>
              <div className="text-sm text-muted-foreground">{siteContent.missionSource}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stay Updated */}
      <StayUpdatedSection />

      <Footer />

      {/* Scroll to Explore Button */}
      <ScrollToExplore />
    </main>
  )
}
