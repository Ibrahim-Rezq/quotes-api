import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import { ThemeProvider } from '@/components/theme-provider'
import ScrollToTop from '@/components/shared/scroll-to-top'
import { i18nConfig } from '@/config/i18nConfig'
import I18nClient from '@/components/i18n-client'
import { Toaster } from 'sonner'
import { getDictionary } from '@/lib/get-dictionary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Quote Manager',
	description: 'Quote Manager App Created with next.js',
	keywords: ['quotes', 'quotes app', 'quote manager', 'quote collection']
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
	const { locale } = params
	const dictionary = await getDictionary(locale)
	const title = dictionary?.branding?.name ?? 'Quote Manager'
	const description = dictionary?.landing?.ctaDescription ?? 'Save, organize, and share your favorite quotes.'

	return {
		title,
		description,
		keywords: ['quotes', 'quotes app', 'quote manager', 'quote collection'],
		authors: [{ name: 'Quote Vault' }],
		openGraph: {
			title,
			description,
			siteName: title,
			type: 'website',
			locale,
			images: [
				{
					url: '/opengraph-image.jpg',
					alt: title
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: ['/opengraph-image.jpg']
		}
	} as Metadata
}

export async function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Readonly<LocaleLayoutProps>) {
	const { locale } = await params
	const dir = locale === 'ar' ? 'rtl' : 'ltr'
	return (
		<html lang={locale} dir={dir} data-theme="dark" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<I18nClient locale={locale}>
						<Header locale={locale} />
						<main>{children}</main>
						<Footer locale={locale} />
						<ScrollToTop />
						<Toaster richColors position="top-right" />
					</I18nClient>
				</ThemeProvider>
			</body>
		</html>
	)
}
