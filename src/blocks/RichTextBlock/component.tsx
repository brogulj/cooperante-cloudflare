import { RichTextBlock as RichTextBlockProps } from '@/payload-types'
import RichText from '@/components/frontend/richtext'

export const RichTextBlock: React.FC<RichTextBlockProps> = (props) => {
  const { content } = props

  return (
    <div className="container py-12 lg:py-20 xl:px-20">
      <RichText
        data={content}
        className="[&_p]:text-lg [&_h1]:text-6xl [&_h2]:text-5xl [&_h3]:text-4xl [&_h4]:text-3xl [&_h5]:text-2xl [&_h6]:text-xl [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-semibold [&_h5]:font-semibold [&_h6]:font-semibold [&_p]:mb-4 [&_h2]:mb-6 [&_h3]:mb-4 [&_h4]:mb-3 [&_h5]:mb-2 [&_h6]:mb-1"
      />
    </div>
  )
}
