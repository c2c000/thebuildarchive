import { createClient, createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Fetch stories (published only for public, all for admin)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const adminMode = searchParams.get('admin') === 'true'
  
  if (adminMode) {
    // Admin: fetch all stories using service role (bypasses RLS)
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('submitted_at', { ascending: false })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    // Transform to match Story interface
    const stories = data.map(row => ({
      id: row.id,
      name: row.name,
      role: row.role,
      image: row.image,
      profileImage: row.profile_image,
      tags: row.tags || [],
      quote: row.quote,
      fullStory: row.full_story,
      location: row.location,
      age: row.age,
      currentStatus: row.current_status,
      status: row.status,
      submittedAt: row.submitted_at,
    }))
    
    return NextResponse.json({ stories })
  } else {
    // Public: fetch only published stories using anon client
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('status', 'published')
      .order('submitted_at', { ascending: false })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    const stories = data.map(row => ({
      id: row.id,
      name: row.name,
      role: row.role,
      image: row.image,
      profileImage: row.profile_image,
      tags: row.tags || [],
      quote: row.quote,
      fullStory: row.full_story,
      location: row.location,
      age: row.age,
      currentStatus: row.current_status,
      status: row.status,
      submittedAt: row.submitted_at,
    }))
    
    // Also get total count for the archive counter
    const { count } = await supabase
      .from('stories')
      .select('*', { count: 'exact', head: true })
    
    return NextResponse.json({ stories, totalCount: count || 0 })
  }
}

// POST - Submit a new story
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, role, quote, fullStory, location, age, currentStatus, tags, profileImage } = body
    
    if (!name || !quote || !fullStory) {
      return NextResponse.json(
        { error: 'Name, quote, and story are required' },
        { status: 400 }
      )
    }
    
    // Use admin client to bypass RLS for inserts
    const supabase = createAdminClient()
    
    const { data, error } = await supabase
      .from('stories')
      .insert({
        name,
        role: role || '',
        quote,
        full_story: fullStory,
        location: location || '',
        age: age || '',
        current_status: currentStatus || '',
        tags: tags || [],
        profile_image: profileImage || null,
        status: 'pending',
      })
      .select()
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, story: data })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

// PATCH - Update story status (admin only)
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body
    
    if (!id || !status || !['pending', 'published'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid id and status required' },
        { status: 400 }
      )
    }
    
    const supabase = createAdminClient()
    
    const { error } = await supabase
      .from('stories')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

// DELETE - Delete a story (admin only)
export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = body
    
    if (!id) {
      return NextResponse.json({ error: 'Story id required' }, { status: 400 })
    }
    
    const supabase = createAdminClient()
    
    const { error } = await supabase
      .from('stories')
      .delete()
      .eq('id', id)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
