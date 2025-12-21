import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { PrismaClient } from '@/generated/prisma'
import { comparePassword, saltAndHashPassword } from './password'

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			authorize: async (credentials) => {
				if (!credentials || typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
					throw new Error('Invalid credentials.')
				}

				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
				if (!emailRegex.test(credentials.email)) {
					throw new Error('Invalid email format.')
				}

				const email = credentials.email.toLowerCase().trim()
				const password = credentials.password

				if (!email || !password || password.length < 1) {
					throw new Error('Invalid credentials.')
				}

				try {
					const pwHash = await saltAndHashPassword(password)

					let user = await prisma.user.findUnique({
						where: { email },
						select: {
							id: true,
							name: true,
							email: true,
							image: true,
							passwordHash: true
						}
					})
					console.log('Found user:', user)
					if (!user) {
						try {
							user = await prisma.user.create({
								data: {
									email,
									name: email.split('@')[0],
									passwordHash: pwHash
								},
								select: {
									id: true,
									name: true,
									email: true,
									image: true,
									passwordHash: true
								}
							})
						} catch (error) {
							if (error instanceof Error && 'code' in error && error.code === 'P2002') {
								throw new Error('Email already in use.')
							}
							console.error('Error creating user:', error)
							throw new Error('Failed to create user account.')
						}
					} else {
						console.log('Verifying password for user:', user)
						const isPasswordValid = await comparePassword(password, user.passwordHash!)
						console.log('Provided password hash:', isPasswordValid)
						if (!user.passwordHash || !isPasswordValid) {
							throw new Error('Invalid credentials.')
						}
					}

					return {
						id: user.id,
						name: user.name,
						email: user.email,
						image: user.image,
						role: 'USER' as const
					}
				} catch (error) {
					if (error instanceof Error) {
						throw error
					}
					throw new Error('Authentication failed')
				}
			}
		}),

		GitHub({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!
		})
	],
	session: {
		strategy: 'jwt'
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string
			}
			return session
		}
	},
	secret: process.env.NEXTAUTH_SECRET
})
