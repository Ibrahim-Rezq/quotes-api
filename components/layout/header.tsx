import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import SignIn from '../sign-in-btn'
import SignOut from '../sign-out-btn'
import { auth } from '@/auth'
import { brand } from '@/consts/landing'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import links from '@/consts/links'

export default async function Header() {
    const session = await auth()
    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
            <div className='mx-auto container flex h-16 items-center justify-between'>
                <div className='flex items-center gap-6'>
                    <Link
                        href={links.home}
                        className='flex items-center space-x-2'
                    >
                        <span className='text-xl font-bold'>{brand.name}</span>
                    </Link>

                    {/* <nav className='hidden md:flex items-center gap-6'>
                        <Link
                            href={links.features}
                            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Features
                        </Link>
                        <Link
                            href={links.pricing}
                            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Pricing
                        </Link>
                        <Link
                            href={links.about}
                            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                        >
                            About
                        </Link>
                        <Link
                            href={links.contact}
                            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Contact
                        </Link>
                    </nav> */}
                </div>

                <div className='flex items-center gap-4'>
                    {session?.user?.name ? (
                        <>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={links.dashboard}>
                                        {session?.user?.name}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Go to Dashboard</p>
                                </TooltipContent>
                            </Tooltip>
                            <SignOut />
                        </>
                    ) : (
                        <SignIn />
                    )}

                    <Button variant='ghost' size='icon' className='md:hidden'>
                        <Menu className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </header>
    )
}
