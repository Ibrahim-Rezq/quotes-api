'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

function ThemeToggleBtn() {
	const { theme, setTheme } = useTheme()

	const handleThemeToggle = useCallback(() => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}, [theme, setTheme])

	const isDark = theme === 'dark'
	const buttonTitle = isDark ? 'Switch to light mode' : 'Switch to dark mode'
	const ariaLabel = `Toggle ${isDark ? 'light' : 'dark'} mode`
	const { t } = useTranslation()
	return (
		<Button
			onClick={handleThemeToggle}
			variant="ghost"
			size="icon"
			className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg"
			aria-label={ariaLabel}
			aria-pressed={isDark}
			title={buttonTitle}
		>
			{isDark ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
			<span className="sr-only">{t('common.toggleTheme')}</span>
		</Button>
	)
}

export default memo(ThemeToggleBtn)
