import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { createGuest, getGuest } from '@/app/_lib/data-service'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    guestId?: string
  }

  interface Session {
    user?: {
      guestId?: string
    } & DefaultSession['user']
  }
}

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: any) {
      return !!auth?.user
    },
    async signIn({ user, account, profile }: any) {
      try {
        const existingGuest = await getGuest(user.email)

        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.fullName || user.name,
          })
        }

        return true
      } catch {
        return false
      }
    },
    async session({ session, token }: any) {
      if (session.user && token.email) {
        const guest = await getGuest(token.email)
        if (guest) {
          session.user.guestId = guest.id
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig)
