'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { i18nConfig } from '@/config/i18nConfig'
import { Languages } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
	const pathName = usePathname()

	const redirectedPathName = (locale: string) => {
		if (!pathName) return '/'
		const segments = pathName.split('/')
		segments[1] = locale
		return segments.join('/')
	}

	const { t } = useTranslation()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Languages className="h-[1.2rem] w-[1.2rem] " />
					<span className="sr-only">{t('common.toggleLanguage')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{i18nConfig.locales.map((locale) => (
					<DropdownMenuItem key={locale} asChild>
						<Link href={redirectedPathName(locale)}>{locale.toUpperCase()}</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
