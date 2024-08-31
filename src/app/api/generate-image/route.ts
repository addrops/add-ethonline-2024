import { NextRequest, NextResponse } from 'next/server'
import { getAndValidateRequestData } from 'src/utils/getAndValidateRequestData'

import { generateImagePayloadSchema } from './schemas'
import axios from 'axios'
import fs from 'fs'

const url = 'https://api.aimlapi.com/images/generate'
const headers = {
  Authorization: 'ad18ecb123134dc38d0ce8464db29013',
  'Content-Type': 'application/json',
}
const payload = {
  model: 'dalle-mini',
  prompt: 'A sunset over a mountain range',
}

export async function POST(req: NextRequest) {
  try {
    const { data, error } = await getAndValidateRequestData(req, generateImagePayloadSchema)

    axios
      .post(url, payload, { headers: headers })
      .then((response) => {
        fs.writeFileSync('output.png', response.data, 'binary')
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 400 })
  }
}
