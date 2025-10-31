import { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'ContactBlock',
  interfaceName: 'ContactBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      localized: true,
    },
    {
      name: 'contactInformation',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'phones',
          type: 'array',
          label: 'Phone',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Phone',
            },
            {
              name: 'phoneLink',
              type: 'text',
              label: 'Phone Link',
            },
          ],
        },
        {
          name: 'emails',
          type: 'array',
          label: 'Emails',
          fields: [
            {
              name: 'email',
              type: 'text',
              label: 'Email',
            },
            {
              name: 'emailLink',
              type: 'text',
              label: 'Email Link',
            },
          ],
        },
        {
          name: 'addresses',
          type: 'array',
          label: 'Addresses',
          fields: [
            {
              name: 'address',
              type: 'text',
              label: 'Address',
              localized: true,
            },
            {
              name: 'addressLink',
              type: 'text',
              label: 'Address Link',
            },
          ],
        },
        {
          name: 'socials',
          type: 'array',
          label: 'Socials',
          fields: [
            {
              name: 'social',
              type: 'text',
              label: 'Social',
            },
            {
              name: 'socialLink',
              type: 'text',
              label: 'Social Link',
            },
          ],
        },
        {
          name: 'workingHours',
          type: 'array',
          label: 'Working Hours',
          fields: [
            {
              name: 'hours',
              type: 'text',
              label: 'Hours',
            },
          ],
        },
        {
          name: 'mapEmbedUrl',
          type: 'text',
          label: 'Map Embed URL',
        },
      ],
    },
    {
      name: 'form',
      type: 'relationship',
      label: 'Form',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'clients',
      type: 'array',
      label: 'Clients',
      fields: [
        {
          name: 'client',
          type: 'upload',
          relationTo: 'media',
          label: 'Client',
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      fields: [
        {
          name: 'testimonial',
          type: 'text',
          label: 'Testimonial',
          localized: true,
        },
        {
          name: 'person',
          type: 'text',
          label: 'Person',
          localized: true,
        },
      ],
    },
  ],
}
