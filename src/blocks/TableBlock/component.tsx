import { TableBlock as TableBlockProps } from '@/payload-types'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DynamicIcon } from 'lucide-react/dynamic'

export const TableBlock: React.FC<TableBlockProps> = (props) => {
  const { title, columns, rows, dark } = props
  return (
    <div
      className={cn(
        'container py-20 gap-8 flex flex-col max-w-screen xl:px-20 bg-background text-foreground',
        dark && 'dark',
      )}
    >
      <div className="max-w-4xl">
        <h2 className="mb-2 text-4xl font-semibold md:text-5xl">{title}</h2>
      </div>
      <div className="rounded-xl border bg-card p-2 shadow-sm max-w-6xl hidden lg:block">
        <Table className="text-base max-w-screen">
          <TableHeader>
            <TableRow>
              {columns?.map((col) => (
                <TableHead key={col.id} className="text-base font-semibold italic">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id}>
                {row.cells?.map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={`${row.cells?.[0]?.id === cell.id ? ' font-semibold' : ''}`}
                  >
                    <div className="flex flex-row gap-3 items-center">
                      {index === 0 ? <DynamicIcon name={row.icon as any} /> : null} {cell.value}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {rows?.map((row) => (
          <Card key={row.id}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex flex-row gap-2 items-center">
                {row.icon && <DynamicIcon name={row.icon as any} />} {row.cells[0].value}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {columns.slice(1).map((col, index) => (
                <>
                  <div key={col.id} className="flex flex-col gap-2">
                    <p className="font-semibold">
                      <span className="mr-2">{index === 1 ? '✅' : '❌'}</span>
                      {col.label}
                    </p>
                    <p className="">{row.cells[index + 1].value}</p>
                  </div>
                  <div className={cn('flex items-center ', index === 0 ? 'flex' : 'hidden')}>
                    <ArrowDown size={28} className="ml-10" />
                  </div>
                </>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
