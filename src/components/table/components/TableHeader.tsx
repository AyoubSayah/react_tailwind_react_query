import React from 'react'
import { tableClasses } from '../styles'
import { cn } from '../../../utils/utilties'

interface TableHeaderProps {
  table: any
  customStyledTh?: string
}

export const TableHeader: React.FC<TableHeaderProps> = ({ table, customStyledTh = "" }) => {
  return (
    <thead className={tableClasses.thead}>
      {table.getHeaderGroups().map((headerGroup: any) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => {
            const meta: any = header.column.columnDef.meta
            const headerText = header.column.columnDef.header as string

            return (
              <th
                key={header.id}
                className={cn(
                  tableClasses.th,
                  meta?.isNumeric && tableClasses.thNumeric,
                  customStyledTh
                )}
                style={{ 
                  maxWidth: `${header.getSize()}px`,
                }}
                onClick={header.column.getToggleSortingHandler()}
                role="columnheader"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    header.column.getToggleSortingHandler()?.(e)
                  }
                }}
                aria-sort={
                  header.column.getIsSorted() === 'asc' 
                    ? 'ascending' 
                    : header.column.getIsSorted() === 'desc' 
                    ? 'descending' 
                    : 'none'
                }
                aria-label={`Sort by ${headerText}`}
              >
                <div className="flex items-center">
                  <span>{headerText}</span>
                  <span className={tableClasses.sortIcon} aria-hidden="true">
             
                  </span>
                </div>
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  )
}