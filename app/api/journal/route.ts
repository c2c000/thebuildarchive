import { createClient, createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

type JournalRow = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  updated_at: string
}

function mapRow(row: JournalRow) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    content: row.content,
    coverImage: row.cover_image || '',
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

// GET - published posts for public, all posts for admin. Optional ?slug= for a single post.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const adminMode = searchParams.get('admin') === 'true'
  const slug = searchParams.get('slug')

  if (adminMode) {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('journal_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ posts: (data as JournalRow[]).map(mapRow) })
  }

  const supabase = await createClient()

  if (slug) {
    const { data, error } = await supabase
      .from('journal_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    if (!data) {
      return NextResponse.json({ post: null }, { status: 404 })
    }
    return NextResponse.json({ post: mapRow(data as JournalRow) })
  }

  const { data, error } = await supabase
    .from('journal_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ posts: (data as JournalRow[]).map(mapRow) })
}

// POST - create a new journal post (admin)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, excerpt, content, coverImage, status } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Build a unique slug
    const base = slugify(title) || 'post'
    let slug = base
    let attempt = 1
    while (true) {
      const { data: existing } = await supabase
        .from('journal_posts')
        .select('id')
        .eq('slug', slug)
        .maybeSingle()
      if (!existing) break
      attempt += 1
      slug = `${base}-${attempt}`
    }

    const publishStatus = status === 'published' ? 'published' : 'draft'

    const { data, error } = await supabase
      .from('journal_posts')
      .insert({
        title,
        slug,
        excerpt: excerpt || '',
        content,
        cover_image: coverImage || '',
        status: publishStatus,
        published_at: publishStatus === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true, post: mapRow(data as JournalRow) })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

// PATCH - update a journal post (admin)
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, title, excerpt, content, coverImage, status } = body

    if (!id) {
      return NextResponse.json({ error: 'Post id required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: current, error: fetchError } = await supabase
      .from('journal_posts')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }
    if (!current) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const currentRow = current as JournalRow
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }

    if (typeof title === 'string') updates.title = title
    if (typeof excerpt === 'string') updates.excerpt = excerpt
    if (typeof content === 'string') updates.content = content
    if (typeof coverImage === 'string') updates.cover_image = coverImage

    if (status === 'published' || status === 'draft') {
      updates.status = status
      // Set published_at the first time it becomes published
      if (status === 'published' && !currentRow.published_at) {
        updates.published_at = new Date().toISOString()
      }
    }

    const { data, error } = await supabase
      .from('journal_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true, post: mapRow(data as JournalRow) })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

// DELETE - delete a journal post (admin)
export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'Post id required' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { error } = await supabase.from('journal_posts').delete().eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
