'use client'

import Link from 'next/link'

import { Button } from 'src/components/Button'
import { Container } from 'src/components/Container'
import { Logo } from 'src/components/Logo'

export function Header() {
  return (
    <header>
      <nav>
        <Container className='relative z-50 flex justify-between py-8'>
          <div className='relative z-10 flex items-center gap-16'>
            <Link href='/' aria-label='Home'>
              <Logo className='h-10 w-auto' />
            </Link>
          </div>
          <div className='flex items-center justify-end'>
            <Button onClick={() => {}} key='logout' color='gray' variant='solid' className='!ml-6'>
              Login
            </Button>
          </div>
        </Container>
      </nav>
    </header>
  )
}
