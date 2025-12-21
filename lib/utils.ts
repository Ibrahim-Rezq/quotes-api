import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function isTextArabic(text: string) {
	const regex = /[\u0600-\u06FF\u0750-\u077F]/
	return regex.test(text)
}
