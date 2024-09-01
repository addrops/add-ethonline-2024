export const postGenerateImage = async () => {
  const response = await fetch('/api/generate-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })

  if (!response.ok) {
    throw new Error('Failed to submit form data')
  }

  return response.json()
}
