import { notFound } from 'next/navigation'
// import { headers } from 'next/headers'

export default async function NotFoundCatchAll({ params }: { params: Promise<{ locale: string }> }) {
	console.log('NotFoundCatchAll invoked with params:', (await params).locale)
	// const headersList = await headers()
	// const locale = headersList.set('x-i18n-router-locale')
	notFound()
}
