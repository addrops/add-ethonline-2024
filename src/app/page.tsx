'use client'
import { useMutation } from '@tanstack/react-query'

import { Button } from 'src/components/Button'
import { Header } from 'src/components/Header'

import { postGenerateImage } from './services'
export default function Home() {
  const { mutate: mutateGenerateImage } = useMutation({
    mutationFn: postGenerateImage,
  })

  const onClickGenerate = () => mutateGenerateImage()

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
