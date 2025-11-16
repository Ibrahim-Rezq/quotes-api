'use client'

import { Quote } from '@/generated/prisma'
import { Menu, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import LikeButton from './like-btn'

type QuoteWithCounts = Quote & {
    likes: {
        id: string
        userId: string
        createdAt: Date
        quoteId: string
    }[]
    comments: {
        content: string
        id: string
        userId: string
        createdAt: Date
        updatedAt: Date
        quoteId: string
    }[]
    _count: {
        likes: number
        comments: number
    }
}

type QuoteCarouselProps = {
    quotes: QuoteWithCounts[]
    userId: string
}

export default function QuoteCarousel({ quotes, userId }: QuoteCarouselProps) {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [quotes.length])

    const currentQuote = quotes[currentQuoteIndex]

    return (
        <section className='container mx-auto px-6 py-12'>
            <div className='max-w-3xl mx-auto'>
                <div className='bg-card rounded-3xl p-8 border border-border shadow-lg'>
                    <div className='bg-gradient-to-br from-muted/50 to-muted rounded-2xl p-12 relative min-h-[300px] flex flex-col justify-between'>
                        <div className='absolute top-6 left-6'>
                            <Menu className='w-6 h-6 text-muted-foreground' />
                        </div>

                        <div className='flex-1 flex items-center justify-center'>
                            <blockquote className='text-3xl text-foreground font-light text-center leading-relaxed'>
                                "{currentQuote.content}"
                            </blockquote>
                        </div>

                        <div className='mt-8'>
                            <div className='flex items-center justify-center space-x-8 mb-6'>
                                <LikeButton
                                    quoteId={currentQuote.id}
                                    userId={userId}
                                    initialLiked={currentQuote.likes.length > 0}
                                    likesCount={currentQuote._count.likes}
                                />
                                <div className='w-2 h-2 bg-muted-foreground/50 rounded-full'></div>
                                <button className='flex items-center space-x-2 text-muted-foreground hover:text-primary transition'>
                                    <MessageCircle className='w-6 h-6' />
                                    <span>{currentQuote._count.comments}</span>
                                </button>
                            </div>

                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-3'>
                                    <div className='w-10 h-10 bg-muted rounded-full'></div>
                                    <div>
                                        <p className='text-foreground text-sm font-medium'>
                                            {currentQuote.author}
                                        </p>
                                        <p className='text-muted-foreground text-xs'>
                                            Featured Quote
                                        </p>
                                    </div>
                                </div>

                                <div className='flex space-x-1'>
                                    {quotes.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition ${
                                                index === currentQuoteIndex
                                                    ? 'bg-primary w-6'
                                                    : 'bg-muted-foreground/30'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
