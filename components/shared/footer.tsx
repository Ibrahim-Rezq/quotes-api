import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { getDictionary } from '@/lib/get-dictionary'
import { brand } from '@/lib/consts'

interface FooterProps {
	locale?: string
}

export default async function Footer({ locale = 'en' }: FooterProps) {
	const currentYear = new Date().getFullYear()

	const dictionary = await getDictionary(locale)

	const localizedHome = `/${locale}`
	const localizedDashboard = `/${locale}/dashboard`

	return (
		<footer className="w-full border-t border-border bg-background" role="contentinfo">
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
					<div className="flex flex-col gap-4">
						<Link
							href={localizedHome}
							className="flex items-center gap-2 w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
							aria-label={`${dictionary.branding.name} home`}
						>
							<span className="text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors">
								{dictionary.branding.name}
							</span>
						</Link>
						<p className="text-sm text-muted-foreground">
							{dictionary?.footer?.brandDescription ?? 'Building amazing experiences for the modern web.'}
						</p>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-semibold text-foreground">
							{dictionary?.footer?.followUs ?? 'Follow Us'}
						</h3>
						<nav className="flex items-center gap-4" aria-label="Social media links">
							{brand.twitter && (
								<Link
									href={brand.twitter}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1"
									aria-label="Follow us on Twitter (opens in new window)"
								>
									<FaTwitter className="h-5 w-5" aria-hidden="true" />
								</Link>
							)}
							{brand.github && (
								<Link
									href={brand.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1"
									aria-label="View our code on GitHub (opens in new window)"
								>
									<FaGithub className="h-5 w-5" aria-hidden="true" />
								</Link>
							)}
							{brand.linkedin && (
								<Link
									href={brand.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1"
									aria-label="Connect with us on LinkedIn (opens in new window)"
								>
									<FaLinkedin className="h-5 w-5" aria-hidden="true" />
								</Link>
							)}
						</nav>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-semibold text-foreground">
							{dictionary?.footer?.navigation ?? 'Navigation'}
						</h3>
						<nav className="flex flex-col gap-2" aria-label="Footer navigation">
							<Link
								href={localizedHome}
								className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2 py-1"
							>
								{dictionary?.common?.home ?? 'Home'}
							</Link>
							<Link
								href={localizedDashboard}
								className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2 py-1"
							>
								{dictionary?.common?.dashboard ?? 'Dashboard'}
							</Link>
						</nav>
					</div>
				</div>

				<div className="w-full h-px bg-border my-8" aria-hidden="true" />

				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
					<p className="text-xs sm:text-sm text-muted-foreground">
						&copy; {currentYear} {dictionary.branding.name}. All rights reserved.
					</p>
					<nav
						className="flex items-center gap-6 text-xs sm:text-sm text-muted-foreground"
						aria-label="Legal"
					>
						<Link
							href="#"
							className="hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2 py-1"
						>
							{dictionary?.footer?.privacy ?? 'Privacy'}
						</Link>
						<Link
							href="#"
							className="hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2 py-1"
						>
							{dictionary?.footer?.terms ?? 'Terms'}
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	)
}
