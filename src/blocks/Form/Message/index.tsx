import React from 'react'

import { Width } from '../Width'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/frontend/richtext'

export const Message: React.FC<{ message: DefaultTypedEditorState }> = ({ message }) => {
  return <>{message && <RichText data={message} />}</>
}
