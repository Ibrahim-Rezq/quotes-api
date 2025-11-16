import type { Config } from 'tailwindcss'
import twAnimate from 'tailwindcss-animate'

const config: Config = {
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [twAnimate],
}
export default config
