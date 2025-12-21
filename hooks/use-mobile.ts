import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

	React.useEffect(() => {
		// Create media query with stable reference
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

		// Use the change event listener with the mql object
		const handleChange = (e: MediaQueryListEvent) => {
			setIsMobile(e.matches)
		}

		// Set initial state
		setIsMobile(mql.matches)

		// Add listener using the modern API
		mql.addEventListener('change', handleChange)

		// Cleanup
		return () => mql.removeEventListener('change', handleChange)
	}, [])

	return !!isMobile
}
