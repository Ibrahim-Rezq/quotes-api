// types/next-auth.d.ts
import { Role } from '@/generated/prisma'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	/**
	 * Extend the session user object
	 */
	interface Session {
		user: {
			id: string
			role: Role
		} & DefaultSession['user']
	}

	/**
	 * Extend the user object returned by authorize()
	 */
	interface User {
		id: string
		role: Role
		email: string
		name?: string | null
		image?: string | null
	}
}

declare module 'next-auth/jwt' {
	/**
	 * Extend the JWT token object
	 */
	interface JWT {
		id: string
		role: Role
	}
}
