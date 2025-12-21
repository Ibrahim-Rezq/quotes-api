import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import ThemeToggleBtn from './theme-toggle-btn'
import { auth } from '@/lib/auth'
import SignOut from '../../app/(auth)/components/sign-out-btn'
import SignIn from '../../app/(auth)/components/sign-in-btn'
import { getDictionary } from '@/lib/get-dictionary'
import LanguageSwitcher from './lang-switcher'

interface HeaderProps {
	locale?: string
}

export default async function Header({ locale = 'en' }: HeaderProps) {
	const session = await auth()

	const dictionary = await getDictionary(locale)

	const localizedHome = `/${locale}`
	const localizedDashboard = `/${locale}/dashboard`

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background">
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
				<div className="flex items-center justify-between">
					<Link
						href={localizedHome}
						className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
					>
						<BookOpen className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
						<h1 className="text-lg sm:text-xl lg:text-2xl serif font-bold font-brand">
							{dictionary?.branding?.name ?? 'Quote Vault'}
						</h1>
					</Link>

					<nav className="hidden md:flex items-center gap-4 lg:gap-8">
						<div className="flex items-center gap-2 sm:gap-4">
							{session?.user?.name ? (
								<>
									<Link
										href={localizedDashboard}
										className="text-sm font-medium text-foreground hover:text-foreground transition-colors truncate"
									>
										{session?.user?.name}
									</Link>

									<SignOut locale={locale} />
								</>
							) : (
								<SignIn locale={locale} />
							)}
							<ThemeToggleBtn />
							<LanguageSwitcher />
						</div>
					</nav>

					<div className="md:hidden flex items-center gap-2">
						{session?.user?.name ? (
							<>
								<Link
									href={localizedDashboard}
									className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
								>
									{session?.user?.name.split(' ')[0]}
								</Link>
								<SignOut locale={locale} />
							</>
						) : (
							<SignIn locale={locale} />
						)}
						<ThemeToggleBtn />
						<LanguageSwitcher />
					</div>
				</div>
			</div>
		</header>
	)
}
