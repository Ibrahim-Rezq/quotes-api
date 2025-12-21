import type { Config } from 'tailwindcss'
import twAnimate from 'tailwindcss-animate'

const config: Config = {
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)'],
				serif: ['var(--font-serif-en)'],
				'serif-ar': ['var(--font-serif-ar)']
			}
		}
	},
	plugins: [twAnimate]
}
export default config
