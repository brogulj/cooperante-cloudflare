import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    hr: 'Podnožje',
    en: 'Footer',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: {
        hr: 'Logo',
        en: 'Logo',
      },
    },
    {
      name: 'links', // The main array that holds all navigation items
      type: 'array',
      label: {
        en: 'Links',
        hr: 'Linkovi',
      },
      fields: [
        {
          name: 'type', // The radio field that determines what type of content is shown below
          type: 'radio',
          label: 'Item Type',
          required: true,
          options: [
            { label: 'Single Link', value: 'singleLink' },
            { label: 'Link Group (Dropdown)', value: 'linkGroup' },
          ],
          defaultValue: 'singleLink',
        },
        {
          name: 'singleLinkContent', // Group for a single link, namespacing the 'link' fields
          type: 'group',
          label: 'Single Link',
          admin: {
            // Only show this group if 'type' is 'singleLink'
            condition: (_, siblingData) => siblingData.type === 'singleLink',
          },
          fields: [
            // The link utility function result goes inside this group
            link({ appearances: ['default', 'outline', 'link'] }),
          ],
        },
        {
          name: 'linkGroupContent', // Group for a link group, namespacing the 'linkGroup' fields
          type: 'group',
          label: 'Link Group',
          admin: {
            // Only show this group if 'type' is 'linkGroup'
            condition: (_, siblingData) => siblingData.type === 'linkGroup',
          },
          fields: [
            // The linkGroup utility function result goes inside this group
            {
              name: 'label',
              type: 'text',
              label: 'Label',
            },
            linkGroup({ appearances: ['default', 'outline', 'link'] }),
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright',
      localized: true,
    },

    {
      name: 'socialLinks',
      type: 'group',
      label: {
        en: 'Social Links',
        hr: 'Društvene mreže',
      },
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube',
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp',
        },
        {
          name: 'telegram',
          type: 'text',
          label: 'Telegram',
        },
      ],
    },
  ],
}
