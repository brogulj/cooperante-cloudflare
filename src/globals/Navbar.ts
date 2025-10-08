import { GlobalConfig } from 'payload'

// Assuming these are your custom access functions and field utilities
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  label: {
    hr: 'Navigacijska traka',
    en: 'Navbar',
  },
  access: {
    // Allows public read if published, or authenticated users access to drafts
    read: authenticatedOrPublished,
    // Only authenticated users can update (write)
    update: authenticated,
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
  ],
}
