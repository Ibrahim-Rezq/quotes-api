'use server'

import prisma from '@/utils/prisma'

export async function toggleLikeOptimistic(quoteId: string, userId: string) {
    try {
        // Check if like exists
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_quoteId: {
                    userId,
                    quoteId,
                },
            },
        })

        if (existingLike) {
            // Unlike - delete the like
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            })
            return { success: true, liked: false }
        } else {
            // Like - create new like
            await prisma.like.create({
                data: {
                    userId,
                    quoteId,
                },
            })
            return { success: true, liked: true }
        }
    } catch (error) {
        console.error('Error toggling like:', error)
        throw new Error('Failed to toggle like')
    }
}
