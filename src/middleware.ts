import { auth } from '@/app/_lib/auth'

export const middleware = auth

export const config = {
  matcher: ['/account'],
}

// Example of how to use middleware to redirect users from one page to another.
// import { NextResponse } from 'next/server'
// export function middleware(request: any) {
//   return NextResponse.redirect(new URL('/about', request.url))
// }
