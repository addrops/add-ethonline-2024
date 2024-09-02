import fs from 'fs'

import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { getAndValidateRequestData } from 'src/utils/getAndValidateRequestData'

import { generateImagePayloadSchema } from './schemas'

const url = 'https://api.aimlapi.com/images/generations'
const headers = {
  Authorization: `Bearer ${process.env.AIML_API_PRIVATE_KEY}`,
  'Content-Type': 'application/json',
}
const payload = {
  prompt: 'An unrealistic photo of a cat',
  model: 'flux/schnell',
  width: 1080,
  height: 1080,
  seed: 37,
  steps: 25,
  reference: null,
}

export async function POST(req: NextRequest) {
  try {
    const { data, error } = await getAndValidateRequestData(req, generateImagePayloadSchema)
    const response = await axios.post(url, payload, { headers })

    const imageUrl = response.data.images[0].url
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' })

    const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64')
    const mimeType = imageResponse.headers['content-type']
    return NextResponse.json({ data: `data:${mimeType};base64,${base64Image}` }, { status: 200 })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status == 429) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 400 })
  }
}
