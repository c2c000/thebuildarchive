import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Footer } from '@/components/footer'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type JournalRow = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  published_at: string | null
}

function formatDate(value: string | null) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

async function getPost(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('journal_posts')
    .select('id, title, slug, excerpt, content, cover_image, published_at')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  return (data as JournalRow | null) ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return { title: 'Entry Not Found | Learning Journal' }
  }
  return {
    title: `${post.title} | Learning Journal`,
    description: post.excerpt || undefined,
  }
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const paragraphs = post.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">
            The Build Archive
          </Link>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All entries
          </Link>
        </nav>
      </header>

      <article className="pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <span className="rounded-full bg-primary/10 px-3 py-1">Learning Journal</span>
            {post.published_at && (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.published_at)}
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 text-lg text-muted-foreground text-pretty">{post.excerpt}</p>
          )}

          {post.cover_image && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image || '/placeholder.svg'}
                alt={post.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <div className="mt-10 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/90"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all entries
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
