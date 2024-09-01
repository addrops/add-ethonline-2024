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
  prompt: 'A man surfing',
  model: 'flux/schnell',
  width: 512,
  height: 512,
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

    fs.writeFileSync('output.png', Buffer.from(imageResponse.data), 'binary')
    return NextResponse.json({ data: 'Image generated' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 400 })
  }
}
