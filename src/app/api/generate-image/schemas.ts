import { z } from 'zod'

export const generateImagePayloadSchema = z.object({
  text: z.string(),
})
