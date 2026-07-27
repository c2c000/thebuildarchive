import { createClient, createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

type SponsorRow = {
  id: string
  name: string
  description: string | null
  url: string | null
  tier: 'platinum' | 'gold' | 'silver' | 'community'
  sort_order: number
  created_at: string
}

type ThankYouRow = {
  id: string
  name: string
  note: string | null
  sort_order: number
  created_at: string
}

function mapSponsor(row: SponsorRow) {
  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    url: row.url || '',
    tier: row.tier,
  }
}

function mapThankYou(row: ThankYouRow) {
  return {
    id: row.id,
    name: row.name,
    note: row.note || '',
  }
}

// GET - returns all sponsors and thank-yous (public read)
export async function GET() {
  const supabase = await createClient()

  const [sponsorsRes, thankYousRes] = await Promise.all([
    supabase.from('sponsors').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: true }),
    supabase.from('thank_yous').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: true }),
  ])

  if (sponsorsRes.error) {
    return NextResponse.json({ error: sponsorsRes.error.message }, { status: 500 })
  }
  if (thankYousRes.error) {
    return NextResponse.json({ error: thankYousRes.error.message }, { status: 500 })
  }

  return NextResponse.json({
    sponsors: (sponsorsRes.data as SponsorRow[]).map(mapSponsor),
    thankYous: (thankYousRes.data as ThankYouRow[]).map(mapThankYou),
  })
}

// POST - create a sponsor or thank-you (admin). Body: { kind: 'sponsor' | 'thankYou', ...fields }
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { kind } = body
    const supabase = createAdminClient()

    if (kind === 'sponsor') {
      const { name, description, url, tier } = body
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 })
      }
      const validTier = ['platinum', 'gold', 'silver', 'community'].includes(tier) ? tier : 'gold'
      const { data, error } = await supabase
        .from('sponsors')
        .insert({
          name,
          description: description || '',
          url: url || '',
          tier: validTier,
        })
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ success: true, sponsor: mapSponsor(data as SponsorRow) })
    }

    if (kind === 'thankYou') {
      const { name, note } = body
      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 })
      }
      const { data, error } = await supabase
        .from('thank_yous')
        .insert({ name, note: note || '' })
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ success: true, thankYou: mapThankYou(data as ThankYouRow) })
    }

    return NextResponse.json({ error: 'Invalid kind' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

// PATCH - update a sponsor or thank-you (admin)
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { kind, id } = body
    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 })
    }
    const supabase = createAdminClient()

    if (kind === 'sponsor') {
      const { name, description, url, tier } = body
      const updates: Record<string, unknown> = {}
      if (typeof name === 'string') updates.name = name
      if (typeof description === 'string') updates.description = description
      if (typeof url === 'string') updates.url = url
      if (['platinum', 'gold', 'silver', 'community'].includes(tier)) updates.tier = tier

      const { data, error } = await supabase
        .from('sponsors')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ success: true, sponsor: mapSponsor(data as SponsorRow) })
    }

    if (kind === 'thankYou') {
      const { name, note } = body
      const updates: Record<string, unknown> = {}
      if (typeof name === 'string') updates.name = name
      if (typeof note === 'string') updates.note = note

      const { data, error } = await supabase
        .from('thank_yous')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ success: true, thankYou: mapThankYou(data as ThankYouRow) })
    }

    return NextResponse.json({ error: 'Invalid kind' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

// DELETE - delete a sponsor or thank-you (admin)
export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { kind, id } = body
    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 })
    }
    const supabase = createAdminClient()
    const table = kind === 'thankYou' ? 'thank_yous' : 'sponsors'

    const { error } = await supabase.from(table).delete().eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
