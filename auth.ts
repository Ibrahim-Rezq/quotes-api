import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { saltAndHashPassword } from '@/utils/password'
import { PrismaClient, Role } from '@/generated/prisma'

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                // Validate credentials format
                if (
                    !credentials ||
                    typeof credentials.email !== 'string' ||
                    typeof credentials.password !== 'string'
                ) {
                    throw new Error('Invalid credentials.')
                }
                console.log('Credentials received:', credentials)
                const email = credentials.email.toLowerCase().trim()
                const password = credentials.password

                // Hash the provided password
                const pwHash = saltAndHashPassword(password)

                // Try to find existing user
                let user = await prisma.user.findUnique({
                    where: { email },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        image: true,
                        passwordHash: true,
                    },
                })

                if (!user) {
                    // // Auto-create new user if doesn't exist
                    // try {
                    //     user = await prisma.user.create({
                    //         data: {
                    //             email,
                    //             name: email.split('@')[0], // Default name from email
                    //             role: 'STUDENT', // Default role
                    //             passwordHash: pwHash,
                    //         },
                    //         select: {
                    //             id: true,
                    //             name: true,
                    //             email: true,
                    //             role: true,
                    //             image: true,
                    //             passwordHash: true,
                    //         },
                    //     })
                    // } catch (error) {
                    //     console.error('Error creating user:', error)
                    //     throw new Error('Failed to create user account.')
                    // }
                    throw new Error('User Not Found.')
                } else {
                    // User exists - verify password
                    if (!user.passwordHash || pwHash !== user.passwordHash) {
                        throw new Error('Invalid credentials.')
                    }
                }

                // Return user object that NextAuth expects
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image,
                }
            },
        }),

        GitHub({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            // Add user info to JWT token
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            // Add user info to session
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as Role
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
})
