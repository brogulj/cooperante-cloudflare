import { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'TestimonialsBlock',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        {
          name: 'personImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'personName',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'personTitle',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'testimonial',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'numberOfStars',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
        },
      ],
    },
  ],
}
