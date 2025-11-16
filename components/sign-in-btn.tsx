'use client'
import { useActionState, useEffect } from 'react'
import { signInAction } from './sign-in-action'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'

const initialState = { message: '' }

export default function SignIn() {
    const [state, formAction] = useActionState(signInAction, initialState)
    useEffect(() => {
        if (state && state.message) {
            toast.error(state.message)
        }
    }, [state])
    return (
        <form action={formAction} className='flex gap-2'>
            <Input
                name='email'
                type='email'
                placeholder='name@email.com'
                required
            />
            <Input
                name='password'
                type='password'
                placeholder='password'
                required
            />
            <Button>Sign In</Button>
        </form>
    )
}
