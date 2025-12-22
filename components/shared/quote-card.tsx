import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { headers } from 'next/headers'
import { getDictionary } from '@/lib/get-dictionary'
import { isTextArabic } from '@/lib/utils'

interface QuoteCardProps {
	quote: string
	author: string
	tags?: string[]
	userName: string | null
	isPublic?: boolean
	children?: React.ReactNode
}

export async function QuoteCard({ quote, author, tags = [], userName, isPublic, children }: QuoteCardProps) {
	const isArabic = isTextArabic(quote)

	const locale = (await headers()).get('x-i18n-router-locale') || 'en'
	const dictionary = await getDictionary(locale)

	const statusPublic = dictionary?.status?.public ?? 'Public'
	const statusPrivate = dictionary?.status?.private ?? 'Private'

	return (
		<Card className="relative group rounded-lg border border-border bg-background p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
			<CardContent className="flex-1 mt-4">
				<p
					dir={isArabic ? 'rtl' : 'ltr'}
					className={`text-start text-lg leading-[1.6] line-clamp-4 mb-4 ${isArabic ? 'font-serif-ar' : 'serif!'}`}
				>
					{quote}
				</p>
			</CardContent>

			<CardHeader className="space-y-4 pt-0">
				<CardTitle className="text-sm font-medium text-foreground">&mdash; {author}</CardTitle>

				{tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<Badge key={tag} variant="secondary" className="text-xs">
								#{tag}
							</Badge>
						))}
					</div>
				)}

				{userName && (
					<div className="pt-4 border-t border-border">
						<CardDescription className="text-sm text-muted-foreground mb-2">
							<span className="text-foreground font-medium">@{userName}</span>
						</CardDescription>
					</div>
				)}

				{isPublic !== undefined && (
					<div className="absolute inset-y-3 inset-inline-end-3">
						<Badge variant={isPublic ? 'secondary' : 'default'}>
							{isPublic ? statusPublic : statusPrivate}
						</Badge>
					</div>
				)}

				{children && <div className="flex gap-2 pt-4">{children}</div>}
			</CardHeader>
		</Card>
	)
}
