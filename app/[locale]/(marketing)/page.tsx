import prisma from '@/lib/db'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { QuoteCard } from '@/components/shared/quote-card'
import { getDictionary } from '@/lib/get-dictionary'
import HtmlToImage from '@/components/shared/html-to-image'

const getQuotes = async () => {
	try {
		const quotes = await prisma.quote.findMany({
			where: { isPublic: true },
			select: {
				user: { select: { name: true } },
				id: true,
				quoteText: true,
				author: true,
				source: true,
				tags: true,
				isPublic: true
			},
			take: 6,
			orderBy: { createdAt: 'desc' }
		})
		return quotes || []
	} catch (error) {
		console.error('Error fetching quotes:', error)
		return []
	}
}

interface DiscoveryPageProps {
	params: Promise<{ locale: string }>
}

export default async function DiscoveryPage({ params }: DiscoveryPageProps) {
	const { locale } = await params
	const dictionary = await getDictionary(locale)
	const sampleQuotes = await getQuotes()
	const latestQuote = sampleQuotes[0]

	return (
		<div className="min-h-screen bg-background">
			<section className="container mx-auto px-4 py-16 md:py-24">
				<div className="text-center mb-12">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6 text-muted-foreground">
						<Sparkles className="h-4 w-4 text-primary" />
						<span>{dictionary.landing?.latestBadge ?? 'Latest Quote'}</span>
					</div>
					<h1 className="text-4xl md:text-5xl serif font-bold text-foreground mb-4 tracking-[-0.02em]">
						{dictionary.landing?.discoverTitle ?? 'Discover Wisdom'}
					</h1>
					<p className="text-lg font-sans text-muted-foreground max-w-[600px] mx-auto mt-6">
						{dictionary.landing?.discoverDescription ??
							'Explore a curated collection of quotes from our community'}
					</p>
				</div>

				<HtmlToImage latestQuote={latestQuote} />
			</section>

			<section className="container mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
						{dictionary.landing?.recentTitle ?? 'Recent Quotes'}
					</h2>
					<p className="text-base text-muted-foreground max-w-2xl mx-auto">
						{dictionary.landing?.recentDescription ?? 'Explore wisdom shared by our community members'}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
					{sampleQuotes.map((quote) => (
						<QuoteCard
							key={quote.id}
							quote={quote.quoteText}
							author={quote.author}
							tags={quote.tags}
							userName={quote.user.name || 'Anonymous'}
						/>
					))}
				</div>

				{sampleQuotes.length === 0 && (
					<div className="text-center py-12">
						<p className="text-muted-foreground mb-6">
							{dictionary.landing?.noQuotes ?? 'No quotes available yet. Be the first to share!'}
						</p>
						<Button asChild size="lg">
							<Link href={`/${locale}/dashboard`}>
								{dictionary.landing?.startCreating ?? 'Start Creating'}
							</Link>
						</Button>
					</div>
				)}
			</section>

			<section className="container mx-auto px-4 py-16 md:py-24">
				<div className="max-w-2xl mx-auto text-center bg-primary text-primary-foreground rounded-2xl p-12">
					<h3 className="text-3xl font-bold mb-4">
						{dictionary.landing?.ctaTitle ?? 'Build Your Quote Collection'}
					</h3>
					<p className="mb-8">
						{dictionary.landing?.ctaDescription ??
							'Save, organize, and share your favorite quotes with our community. Create beautiful, shareable quote images.'}
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild size="lg" variant="outline">
							<Link href={`/${locale}/dashboard`}>{dictionary.landing?.getStarted ?? 'Get Started'}</Link>
						</Button>
						<Button asChild variant="ghost" size="lg">
							<Link href={`/${locale}`}>{dictionary.landing?.learnMore ?? 'Learn More'}</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}
