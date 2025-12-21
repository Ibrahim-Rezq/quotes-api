'use server'
import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { getDictionary } from '@/lib/get-dictionary'

export const signInAction = async (
	prevState: { message: string } | undefined,
	formData: FormData,
	locale: string = 'en'
) => {
	'use server'
	const dict = await getDictionary(locale)
	try {
		await signIn('credentials', formData)
	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { message: dict?.authErrors?.invalidCredentials ?? 'Invalid email or password' }
				case 'CallbackRouteError':
					return {
						message: dict?.authErrors?.authFailed ?? 'Authentication failed. Please try again.'
					}
				default:
					return { message: dict?.authErrors?.signinError ?? 'An error occurred during sign-in' }
			}
		}

		if (error instanceof Error) {
			console.error('Sign-in error:', error.message)
			return { message: dict?.authErrors?.unexpected ?? 'An unexpected error occurred' }
		}

		return { message: dict?.authErrors?.failed ?? 'Failed to sign in' }
	}
}
