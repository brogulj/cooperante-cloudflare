import { CSVTableBlock as CSVTableBlockProps } from '@/payload-types'
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
import * as csvToJson from 'csvtojson'
import Papa from 'papaparse'

export const CSVTableBlock: React.FC<CSVTableBlockProps> = (props) => {
  const { title, csv, dark } = props

  const rows: Record<string, string>[] = Papa.parse(csv, { header: true }).data as Record<
    string,
    string
  >[]
  const columns: string[] = Object.keys(rows[0]).filter((column) => column !== 'icon')

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
        <Table className="text-base max-w-screen p-4">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column} className="text-base font-semibold italic pb-2">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row[columns[0]]} className="py-4">
                {columns.map((column, index) => (
                  <TableCell
                    key={column}
                    className={cn('text-base', index === 0 ? 'flex items-center gap-2' : '')}
                  >
                    {index === 0 && row.icon ? <DynamicIcon name={row.icon as any} /> : null}
                    {row[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {rows.map((row, rowIndex) => (
          <Card key={rowIndex}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{row[columns[0]]}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {columns.slice(1).map((column, index) => (
                <>
                  <div key={column} className="flex flex-col gap-2">
                    <p className="font-semibold">{column}</p>
                    <p className="">{row[column]}</p>
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
