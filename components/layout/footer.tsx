import Link from 'next/link'
import { brand } from '@/consts/landing'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import links from '@/consts/links'

export default function Footer() {
    return (
        <footer className='w-full border-t bg-background h-footer'>
            <div className='mx-auto container flex flex-col items-center justify-around h-full'>
                <div className='flex items-center justify-between w-full mx-16'>
                    <Link
                        href={links.home}
                        className='flex items-center space-x-2 '
                    >
                        <span className='text-xl font-bold'>{brand.name}</span>
                    </Link>
                    <div className='flex items-center gap-4'>
                        {brand.twitter && (
                            <Link
                                href={brand.twitter}
                                target='_blank'
                                className='text-muted-foreground hover:text-foreground transition-colors'
                            >
                                <FaTwitter className='h-5 w-5' />
                            </Link>
                        )}
                        {brand.github && (
                            <Link
                                href={brand.github}
                                target='_blank'
                                className='text-muted-foreground hover:text-foreground transition-colors'
                            >
                                <FaGithub className='h-5 w-5' />
                            </Link>
                        )}
                        {brand.linkedin && (
                            <Link
                                href={brand.linkedin}
                                target='_blank'
                                className='text-muted-foreground hover:text-foreground transition-colors'
                            >
                                <FaLinkedin className='h-5 w-5' />
                            </Link>
                        )}
                    </div>
                    <p className='text-sm text-muted-foreground '>
                        Building amazing experiences for the modern web.
                    </p>
                </div>
                <p className='text-sm text-muted-foreground text-center'>
                    © {new Date().getFullYear()} {brand.name}. All rights
                    reserved.
                </p>
            </div>
        </footer>
    )
}
