'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Github, Youtube, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContent } from '@/lib/content-context'

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const { siteContent } = useContent()

  return (
    <footer ref={containerRef} className="border-t border-border bg-card/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            {siteContent.footerCta}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {siteContent.footerDescription}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#entry-lab">
              <Button className="group gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Start Learning
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
            <a href="#submit">
              <Button variant="outline" className="gap-2">
                Share Your Story
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#documentary"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Documentary
                </a>
              </li>
              <li>
                <a
                  href="#stories"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Story Archive
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  STEM Careers
                </a>
              </li>
              <li>
                <a
                  href="#entry-lab"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Entry Lab
                </a>
              </li>
              <li>
                <a
                  href="#dissected"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dissected
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Educators
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Research
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  The Project
                </Link>
              </li>
              <li>
                <a
                  href="#submit"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Share Your Story
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              Connect
            </h3>
            <div className="flex gap-4">
              {siteContent.socialInstagram && (
                <a
                  href={siteContent.socialInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {siteContent.socialYoutube && (
                <a
                  href={siteContent.socialYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}
              {siteContent.socialGithub && (
                <a
                  href={siteContent.socialGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {siteContent.socialEmail && (
                <a
                  href={`mailto:${siteContent.socialEmail}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
              {!siteContent.socialInstagram && !siteContent.socialYoutube && !siteContent.socialGithub && !siteContent.socialEmail && (
                <p className="text-sm text-muted-foreground">Add links in admin</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 border-t border-border pt-8"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {siteContent.footerProjectDescription}
            </p>
            <p className="text-xs text-muted-foreground/60">
              Made with intention.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
