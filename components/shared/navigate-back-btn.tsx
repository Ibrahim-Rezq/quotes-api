'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/compat/router'
import { useTranslation } from 'react-i18next'

function NavigateBackBtn() {
	const router = useRouter()
	const { t } = useTranslation()

	return (
		<Button
			variant="outline"
			onClick={() => router !== null && router.back()}
			className="flex-1 flex items-center gap-2 rtl:flex-row-reverse"
		>
			<ArrowLeft className="me-2 h-4 w-4 rtl:-scale-x-100" />
			{t('navigation.back')}
		</Button>
	)
}

export default NavigateBackBtn
