import { MediaBlock } from '@/blocks/MediaBlock/component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
  convertLexicalNodesToJSX,
} from '@payloadcms/richtext-lexical/react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { FormBlock } from '@/blocks/Form/component'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  heading: ({ node, nodesToJSX }) => {
    const childrenJSX = nodesToJSX({ nodes: node.children })
    switch (node.tag) {
      case 'h2':
        return <h2 className="text-3xl font-semibold mb-4">{childrenJSX}</h2>
      case 'h3':
        return <h3 className="text-2xl font-semibold mb-4">{childrenJSX}</h3>
      case 'h4':
        return <h4 className="text-xl font-semibold mb-4">{childrenJSX}</h4>
      case 'h5':
        return <h5 className="text-lg font-semibold mb-4">{childrenJSX}</h5>
      case 'h6':
        return <h6 className="text-base font-semibold mb-4">{childrenJSX}</h6>
      default:
        return <h1 className="text-4xl font-semibold mb-4">{childrenJSX}</h1>
    }
  },
  paragraph: ({ node, nodesToJSX }) => {
    const childrenJSX = nodesToJSX({ nodes: node.children })

    return <p className="text-lg mb-4">{childrenJSX}</p>
  },
  blocks: {
    MediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3 mb-4"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    FormBlock: ({ node }: { node: any }) => <FormBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn('payload-richtext', className)}
      {...rest}
    />
  )
}
