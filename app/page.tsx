import { Heart, MessageCircle, TrendingUp, Sparkles } from 'lucide-react'
import prisma from '@/utils/prisma'
import QuoteCarousel from '../components/quote-carosel'
import LikeButton from '../components/like-btn'

async function getQuotes(userId: string) {
    const quotes = await prisma.quote.findMany({
        where: {
            isPublic: true,
        },
        include: {
            likes: {
                where: { userId },
            },
            comments: true,
            _count: {
                select: { likes: true, comments: true },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    const popularQuotes = quotes
        .sort((a, b) => b._count.likes - a._count.likes)
        .slice(0, 3)

    return { quotes, popularQuotes }
}

export default async function LandingPage() {
    // TODO: Get actual user ID from session/auth
    const userId = 'cmi23w4gi0000bufjgwm8enqp'
    const { quotes, popularQuotes } = await getQuotes(userId)

    return (
        <div className='min-h-screen bg-gradient-to-br from-background via-muted/50 to-background'>
            {/* Hero Quote */}
            <QuoteCarousel quotes={quotes} userId={userId} />

            {/* Popular Quotes */}
            <section className='container mx-auto px-6 py-12'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center space-x-2'>
                        <TrendingUp className='w-5 h-5 text-orange-500' />
                        <h2 className='text-2xl font-bold text-foreground'>
                            Popular Quotes
                        </h2>
                    </div>
                    <button className='text-primary hover:text-primary/80 transition text-sm'>
                        View All
                    </button>
                </div>

                <div className='grid md:grid-cols-3 gap-6'>
                    {popularQuotes.map((quote) => (
                        <div
                            key={quote.id}
                            className='bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition shadow-sm'
                        >
                            <p className='text-foreground text-lg mb-4 line-clamp-3'>
                                "{quote.content}"
                            </p>
                            <div className='flex items-center justify-between'>
                                <p className='text-muted-foreground text-sm'>
                                    — {quote.author}
                                </p>
                            </div>
                            <div className='flex items-center space-x-4 mt-4 pt-4 border-t border-border'>
                                <LikeButton
                                    quoteId={quote.id}
                                    userId={userId}
                                    initialLiked={quote.likes.length > 0}
                                    likesCount={quote._count.likes}
                                />
                                <button className='flex items-center space-x-1 text-muted-foreground hover:text-primary transition text-sm'>
                                    <MessageCircle className='w-4 h-4' />
                                    <span>{quote._count.comments}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Explore More */}
            <section className='container mx-auto px-6 py-12'>
                <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center space-x-2'>
                        <Sparkles className='w-5 h-5 text-purple-500' />
                        <h2 className='text-2xl font-bold text-foreground'>
                            Explore More
                        </h2>
                    </div>
                    <button className='text-primary hover:text-primary/80 transition text-sm'>
                        See All
                    </button>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {quotes.slice(0, 6).map((quote) => (
                        <div
                            key={quote.id}
                            className='bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition group shadow-sm'
                        >
                            <p className='text-foreground mb-4 line-clamp-2'>
                                "{quote.content}"
                            </p>
                            <div className='flex items-center justify-between text-sm'>
                                <div className='flex items-center space-x-2'>
                                    <div className='w-8 h-8 bg-muted rounded-full'></div>
                                    <span className='text-muted-foreground'>
                                        {quote.author}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center space-x-4 mt-4 pt-4 border-t border-border'>
                                <LikeButton
                                    quoteId={quote.id}
                                    userId={userId}
                                    initialLiked={quote.likes.length > 0}
                                    likesCount={quote._count.likes}
                                />
                                <button className='flex items-center space-x-1 text-muted-foreground hover:text-primary transition text-sm'>
                                    <MessageCircle className='w-4 h-4' />
                                    <span>{quote._count.comments}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
