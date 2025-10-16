import { ProcessBlock as ProcessBlockProps } from '@/payload-types'
import React from 'react'
import { cn } from '@/lib/utils'

export const ProcessBlock: React.FC<ProcessBlockProps> = (props) => {
  const { title, steps, dark } = props
  return (
    <div
      className={cn(
        'container py-16 lg:py-32 gap-4 flex flex-col max-w-screen xl:px-20 bg-background text-foreground',
        dark && 'dark',
      )}
    >
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">{title}</h2>
      </div>
      {steps?.length ? (
        <ol className="relative grid grid-cols-1 gap-8 lg:grid-cols-3">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1
            return (
              <li key={step.id} className="relative">
                <div className="h-full rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-base font-semibold">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold leading-snug">{step.title}</h3>
                  </div>
                  <p className="text-base text-foreground">{step.description}</p>
                </div>
              </li>
            )
          })}
        </ol>
      ) : null}
    </div>
  )
}
