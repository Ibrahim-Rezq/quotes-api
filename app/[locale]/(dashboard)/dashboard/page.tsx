import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { CreateQuoteModal } from './components/add-quote-modal'
import { EditQuoteModal } from './components/edit-quote-modal'
import { DeleteQuoteModal } from './components/delete-quote-modal'
import { Separator } from '@/components/ui/separator'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { getDictionary } from '@/lib/get-dictionary'
import { QuoteCard } from '@/components/shared/quote-card'
import { redirect } from 'next/navigation'

const getQuotes = async (userId: string) => {
	try {
		const quotes = await prisma.quote.findMany({
			where: { userId },
			select: {
				user: { select: { name: true } },
				id: true,
				quoteText: true,
				author: true,
				source: true,
				tags: true,
				isPublic: true
			},
			orderBy: { createdAt: 'desc' }
		})
		return quotes || []
	} catch (error) {
		console.error('Error fetching user quotes:', error)
		return []
	}
}

interface DashboardPageProps {
	params: Promise<{ locale: string }>
}

export default async function Dashboard({ params }: DashboardPageProps) {
	const { locale } = await params
	const dictionary = await getDictionary(locale)
	const session = await auth()

	if (!session?.user?.id) {
		redirect(`/${locale}`)
	}

	const quotes = await getQuotes(session?.user?.id as string)

	return (
		<div className="min-h-screen bg-background">
			<section className="border-b border-border">
				<div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
					<div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
						<div className="flex-1 flex flex-col md:flex-row gap-6 items-start md:items-center">
							<div className="shrink-0">
								<div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20">
									<span className="text-3xl md:text-4xl font-bold text-primary">
										{session?.user?.name?.charAt(0).toUpperCase() || 'U'}
									</span>
								</div>
							</div>

							<div className="flex-1">
								<h1 className="text-3xl md:text-4xl font-bold text-primary-background mb-2">
									{session?.user?.name || 'User'}
								</h1>
								<p className="text-sm text-muted-foreground mb-4">{session?.user?.email}</p>

								{/* Stats */}
								<div className="flex items-center gap-6">
									<div>
										<p className="text-4xl font-bold text-background">{quotes.length}</p>
										<p className="text-sm text-muted-foreground">
											{dictionary?.dashboard?.quotesCollected ?? 'Quotes Collected'}
										</p>
									</div>
									<Separator orientation="vertical" className="h-12" />
									<div>
										<p className="text-4xl font-bold text-background">
											{quotes.filter((q) => q.isPublic).length}
										</p>
										<p className="text-sm text-muted-foreground">
											{dictionary?.dashboard?.publicQuotes ?? 'Public Quotes'}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="shrink-0 w-full md:w-auto">
							<CreateQuoteModal userId={session?.user.id} />
						</div>
					</div>
				</div>
			</section>

			<section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
				{quotes.length > 0 ? (
					<>
						<div className="mb-8">
							<h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
								{dictionary?.dashboard?.yourQuotes ?? 'Your Quotes'}
							</h2>
							<p className="text-muted-foreground">
								{dictionary?.dashboard?.manageCollection ?? 'Manage your collection of quotes'}
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{quotes.map((quote) => (
								<QuoteCard
									key={quote.id}
									quote={quote.quoteText}
									author={quote.author}
									tags={quote.tags}
									userName={quote.user.name}
									isPublic={quote.isPublic}
								>
									<div className="flex justify-end rtl:justify-start">
										<div className="relative">
											<div className="inline-block">
												<details className="relative">
													<summary className="cursor-pointer px-2 py-1">⋮</summary>
													<div className="absolute inset-inline-end-0 mt-2 w-40 rounded-md border bg-popover p-1 shadow-md">
														<EditQuoteModal
															quote={quote}
															trigger={
																<button className="w-full text-start px-3 py-2 text-sm">
																	{dictionary?.dashboard?.editQuote ?? 'Edit Quote'}
																</button>
															}
														/>
														<DeleteQuoteModal
															quoteId={quote.id}
															quoteText={quote.quoteText}
															trigger={
																<button className="w-full text-start px-3 py-2 text-sm text-destructive">
																	{dictionary?.dashboard?.deleteQuote ??
																		'Delete Quote'}
																</button>
															}
														/>
													</div>
												</details>
											</div>
										</div>
									</div>
								</QuoteCard>
							))}
						</div>
					</>
				) : (
					<Card className="border border-border">
						<CardHeader className="text-center py-12">
							<CardTitle className="text-2xl mb-4 serif">
								{dictionary?.dashboardEmpty?.noQuotesTitle ?? 'No quotes yet'}
							</CardTitle>
							<p className="text-muted-foreground mb-6">
								{dictionary?.dashboardEmpty?.noQuotesDescription ??
									'Start building your quote collection by creating your first quote.'}
							</p>
							<CreateQuoteModal userId={session?.user.id} />
						</CardHeader>
					</Card>
				)}
			</section>
		</div>
	)
}
