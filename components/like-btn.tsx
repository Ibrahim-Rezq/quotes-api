'use client'

import { Heart } from 'lucide-react'
import { toggleLikeOptimistic } from './like-action'
import { useState } from 'react'

type LikeButtonProps = {
    quoteId: string
    userId: string
    initialLiked: boolean
    likesCount: number
}

export default function LikeButton({
    quoteId,
    userId,
    initialLiked,
    likesCount,
}: LikeButtonProps) {
    const [liked, setLiked] = useState(initialLiked)
    const [count, setCount] = useState(likesCount)
    const [isPending, setIsPending] = useState(false)

    const handleLike = async () => {
        // Optimistic update
        const newLiked = !liked
        setLiked(newLiked)
        setCount(newLiked ? count + 1 : count - 1)
        setIsPending(true)

        try {
            // Call server action without revalidating
            await toggleLikeOptimistic(quoteId, userId)
        } catch (error) {
            // Rollback on error
            setLiked(!newLiked)
            setCount(newLiked ? count - 1 : count + 1)
            console.error('Failed to toggle like:', error)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <button
            onClick={handleLike}
            disabled={isPending}
            className='flex items-center space-x-1 text-muted-foreground hover:text-destructive transition text-sm disabled:opacity-50'
        >
            <Heart
                className={`w-4 h-4 transition ${
                    liked ? 'fill-destructive text-destructive' : ''
                }`}
            />
            <span>{count}</span>
        </button>
    )
}
