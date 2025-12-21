'use client'

import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

interface ErrorProps {
	error: Error & { digest?: string }
	reset: () => void
}

export default function Error({ reset }: ErrorProps) {
	const { t } = useTranslation()

	return (
		<div className="min-h-screen flex items-center justify-center bg-background px-4">
			<Card className="w-full max-w-md border border-border">
				<CardHeader className="text-center space-y-4">
					<div className="flex justify-center">
						<div className="rounded-lg bg-destructive/10 p-3">
							<AlertCircle className="h-8 w-8 text-destructive" />
						</div>
					</div>
					<CardTitle className="text-2xl serif">{t('errors.somethingWrong')}</CardTitle>
					<CardDescription>{t('errors.processingError')}</CardDescription>
				</CardHeader>
				<CardContent className="flex gap-3">
					<Button onClick={() => reset()} className="flex-1">
						{t('errors.tryAgain')}
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
