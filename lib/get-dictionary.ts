import { Dictionary } from '@/types/dictionary.d'

export async function getDictionary(locale: string): Promise<Dictionary> {
	try {
		const dictionary = await import(`@/public/messages/${locale}.json`)
		return dictionary.default
	} catch (err: unknown) {
		const errorMessage = err instanceof Error ? err.message : String(err)
		console.warn(`Dictionary for locale "${locale}" not found, falling back to English. Error: ${errorMessage}`)
		try {
			const fallback = await import(`@/public/messages/en.json`)
			return fallback.default
		} catch (fallbackErr: unknown) {
			const fallbackErrorMessage = fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr)
			console.error(`Fallback dictionary (en.json) not found. Error: ${fallbackErrorMessage}`)
			return {} as Dictionary
		}
	}
}
