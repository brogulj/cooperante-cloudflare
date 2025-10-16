import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

export const BlogPostsBlock: Block = {
  slug: 'BlogPostsBlock',
  interfaceName: 'BlogPostsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      localized: true,
    },
    linkGroup({
      overrides: {
        label: {
          hr: 'Linkovi',
          en: 'Links',
        },
      },
      appearances: ['default', 'outline'],
    }),
  ],
}
