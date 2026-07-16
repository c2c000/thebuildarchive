import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Footer } from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Journal | The Build Archive',
  description:
    'A weekly journal documenting the messy, honest process of learning engineering from scratch — one post at a time.',
}

export const dynamic = 'force-dynamic'

type JournalRow = {
  id: string
  title: string
  slug: string
  excerpt: string | null
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

export default async function JournalPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('journal_posts')
    .select('id, title, slug, excerpt, cover_image, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const posts = (data as JournalRow[] | null) ?? []
  const [featured, ...rest] = posts

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">
            The Build Archive
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="border-b border-border pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-widest text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            One post a week
          </span>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
            Learning Journal
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
            An honest, weekly record of learning engineering from scratch — the questions, the
            breakthroughs, and everything confusing in between.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
              <BookOpen className="mb-4 h-10 w-10 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">No entries yet</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                The first journal entry is on its way. Check back soon for the first weekly post.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured (latest) post */}
              <Link href={`/journal/${featured.slug}`} className="group block">
                <article className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  {featured.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.cover_image || '/placeholder.svg'}
                      alt={featured.title}
                      className="h-64 w-full object-cover sm:h-80"
                    />
                  ) : (
                    <div className="flex h-64 w-full items-center justify-center bg-primary/5 sm:h-80">
                      <BookOpen className="h-12 w-12 text-primary/40" />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                      <span className="rounded-full bg-primary/10 px-3 py-1">Latest</span>
                      {featured.published_at && (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(featured.published_at)}
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground text-balance sm:text-3xl">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-3 text-muted-foreground text-pretty">{featured.excerpt}</p>
                    )}
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Read entry
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>

              {/* Rest of the posts */}
              {rest.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {rest.map((post) => (
                    <Link key={post.id} href={`/journal/${post.slug}`} className="group block h-full">
                      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                        {post.cover_image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.cover_image || '/placeholder.svg'}
                            alt={post.title}
                            className="h-44 w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-44 w-full items-center justify-center bg-primary/5">
                            <BookOpen className="h-8 w-8 text-primary/40" />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-6">
                          {post.published_at && (
                            <span className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(post.published_at)}
                            </span>
                          )}
                          <h3 className="font-serif text-xl font-bold text-foreground text-balance">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                            Read entry
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
