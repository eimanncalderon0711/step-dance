import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@/lib/supabase/server'

export async function proxy(request: NextRequest) {
  const response = await updateSession(request)

  const path = request.nextUrl.pathname

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 🔒 1. Protect admin route
  if (path.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // 🔁 2. Prevent logged-in users from accessing login page
  if (path.startsWith('/login')) {
    if (user) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}