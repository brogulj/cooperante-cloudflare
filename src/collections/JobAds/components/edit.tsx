'use client'

import { useParams } from 'next/navigation'
import { translateJobAdRichText } from './translate-rich-text'
import { Button, toast } from '@payloadcms/ui'
import { translateJobAdText } from './translate-text'
import { useState } from 'react'
import { CTABlock } from '@/blocks/CTABlock/config'

export const Translate = () => {
  const params: { segments: string[] } = useParams()
  const jobAdId = params.segments[2]
  const [isTranslating, setIsTranslating] = useState(false)

  const handleTranslate = async () => {
    setIsTranslating(true)
    toast.promise(
      async () => {
        // console.dir(JSON.stringify(CTABlock, null, 2), { depth: null })
        await translateJobAdText(jobAdId)
        await translateJobAdRichText(jobAdId)
      },
      {
        loading: 'Translating...',
        success: 'Translation successful',
        error: 'Translation failed',
      },
    )
    setIsTranslating(false)
  }

  return (
    <Button onClick={handleTranslate} type="button" disabled={isTranslating}>
      Translate
    </Button>
  )
}
