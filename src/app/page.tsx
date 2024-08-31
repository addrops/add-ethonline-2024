'use client'

import { Header } from 'src/components/Header'
import { Button } from 'src/components/Button'

export default function Home() {
  const onClickGenerate = () => {}

  return (
    <main className='flex-auto'>
      <Header />
      <div className='flex justify-center'>
        <Button variant='solid' color='addrops' onClick={onClickGenerate}>
          Generate
        </Button>
      </div>
    </main>
  )
}
