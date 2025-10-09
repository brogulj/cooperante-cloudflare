'use client'

import { useEffect, useMemo, useState } from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { toKebabCase } from '@/utilities/toKebabCase'
import { cn } from '@/utilities/ui'

type HeadingItem = {
  id: string
  text: string
  level: number
}

type RichTextNode = {
  type?: string
  tag?: string
  text?: string
  children?: RichTextNode[]
}

type Props = {
  content: DefaultTypedEditorState
  containerId?: string
  className?: string
  minLevel?: number
  maxLevel?: number
}

function extractTextFromNode(node: RichTextNode | null | undefined): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join('')
  }
  return ''
}

function extractHeadings(
  content: DefaultTypedEditorState,
  minLevel: number,
  maxLevel: number,
): HeadingItem[] {
  const headings: HeadingItem[] = []

  function walk(nodes: RichTextNode[]): void {
    if (!Array.isArray(nodes)) return
    for (const node of nodes) {
      if (node?.type === 'heading' && typeof node?.tag === 'string') {
        const level = Number(node.tag?.replace('h', ''))
        if (!Number.isNaN(level) && level >= minLevel && level <= maxLevel) {
          const text = extractTextFromNode(node)
          headings.push({ id: '', text, level })
        }
      }
      if (Array.isArray(node?.children)) {
        walk(node.children)
      }
    }
  }

  const rootChildren =
    (content as unknown as { root?: { children?: RichTextNode[] } })?.root?.children ?? []
  walk(rootChildren)
  return headings
}

function assignUniqueIds(items: Omit<HeadingItem, 'id'>[]): HeadingItem[] {
  const slugCounts: Record<string, number> = {}
  return items.map((item) => {
    const base = toKebabCase(item.text || 'section')
    const count = (slugCounts[base] ?? 0) + 1
    slugCounts[base] = count
    const id = count === 1 ? base : `${base}-${count}`
    return { ...item, id }
  })
}

export default function TableOfContents(props: Props) {
  const { content, containerId = 'article-content', className, minLevel = 2, maxLevel = 4 } = props

  const items = useMemo(
    () => assignUniqueIds(extractHeadings(content, minLevel, maxLevel)),
    [content, minLevel, maxLevel],
  )

  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const selector = Array.from({ length: maxLevel - minLevel + 1 })
      .map((_, i) => `h${i + minLevel}`)
      .join(',')

    const headings = Array.from(container.querySelectorAll(selector)) as HTMLElement[]

    // Assign IDs deterministically based on parsed items order/levels
    let itemIndex = 0
    for (const el of headings) {
      const level = Number(el.tagName.replace('H', ''))
      // Skip heading levels outside desired range
      if (level < minLevel || level > maxLevel) continue
      const item = items[itemIndex]
      if (!item) break
      // Ensure the element has the expected id
      el.id = item.id
      itemIndex += 1
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id')
          if (!id) return
          if (entry.isIntersecting) {
            setActiveId(id)
          }
        })
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] },
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items, containerId, minLevel, maxLevel])

  if (items.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className={cn('text-sm rounded-md border bg-card/50 p-4 shadow-sm', className)}
    >
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
        Sadržaj
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              'truncate pl-2 border-l-2 border-transparent transition-colors',
              item.level === 3 && 'pl-5',
              item.level === 4 && 'pl-8',
              activeId === item.id && 'border-l-primary',
            )}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-1 hover:underline hover:text-foreground',
                activeId === item.id ? 'text-foreground font-medium' : 'text-muted-foreground',
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
