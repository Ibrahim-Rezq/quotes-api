'use server'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export const signInAction = async (
    prevState: { message: string } | undefined,
    formData: FormData
) => {
    'use server'
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { message: 'Invalid email or password' }
                case 'CallbackRouteError':
                    return {
                        message: 'Authentication failed. Please try again.',
                    }
                default:
                    return { message: 'An error occurred during sign-in' }
            }
        }

        if (error instanceof Error) {
            console.error('Sign-in error:', error.message)
            return { message: 'An unexpected error occurred' }
        }

        return { message: 'Failed to sign in' }
    }
}
