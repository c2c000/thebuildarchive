import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET - Get story counts for admin dashboard
export async function GET() {
  const supabase = createAdminClient()
  
  // Get all counts
  const [totalResult, pendingResult, publishedResult] = await Promise.all([
    supabase.from('stories').select('*', { count: 'exact', head: true }),
    supabase.from('stories').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('stories').select('*', { count: 'exact', head: true }).eq('status', 'published'),
  ])
  
  return NextResponse.json({
    total: totalResult.count || 0,
    pending: pendingResult.count || 0,
    published: publishedResult.count || 0,
  })
}
