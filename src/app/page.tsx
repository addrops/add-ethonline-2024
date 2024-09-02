'use client'

import { useEffect } from 'react'

import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'

import { Button } from 'src/components/Button'
import { Header } from 'src/components/Header'

import { postGenerateImage } from './services'

export default function Home() {
  const {
    data,
    mutate: mutateGenerateImage,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: postGenerateImage,
  })

  const onClickGenerate = () => mutateGenerateImage()

  useEffect(() => {
    mutateGenerateImage()
  }, [mutateGenerateImage])

  return (
    <main className='flex-auto'>
      <Header />
      <div className='flex justify-center px-8'>
        <div className='flex flex-col max-w-[470px] gap-4'>
          <div className='flex flex-col'>
            <label
              htmlFor='description'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Description
            </label>
            <div className='mt-2'>
              <textarea
                id='description'
                name='description'
                placeholder='An ultrarealistic photo of a cat'
                rows={4}
                className='block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-addrops sm:text-sm sm:leading-6'
                defaultValue={''}
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-center'>{error.message}</p>}
          <div className='w-full'>
            {data && <Image src={data.data} alt='Next.js Logo' width={470} height={470} />}
            {isPending && <div className='flex w-[470px] h-[470px] animate-pulse bg-slate-700' />}
            {isError && <div className='flex w-[470px] h-[470px] bg-slate-700' />}
          </div>

          <Button variant='solid' color='addrops' onClick={onClickGenerate}>
            Generate
          </Button>
        </div>
      </div>
    </main>
  )
}
