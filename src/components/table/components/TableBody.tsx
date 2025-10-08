import React from 'react'
import { flexRender } from '@tanstack/react-table'
import { tableClasses } from '../styles'
import { cn } from '../../../utils/utilties'
import { DEFAULT_MIN_HEIGHT } from '../constants/constants'
import { getCellStyle, shouldShowBorder } from '../utils'
import type { Column } from '../types'
import { Button } from '../../button'

interface TableBodyProps {
  table: any
  minH?: string
  trWithBorderLeft?: ((row: any) => string) | boolean
  customStyledTd?: string
  tableColumns?: Column[]
  data: any[]
}

export const TableBody: React.FC<TableBodyProps> = ({
  table,
  minH,
  trWithBorderLeft,
  customStyledTd = "",
  data,
  tableColumns,
}) => {
  const custom = tableColumns?.filter((_col: any) => _col?.customArg)
  const customComponent: any[] = data?.map(() => custom).flat()
  const _actions: any = tableColumns?.filter((_col: any) => _col?.actions?.length)[0]

  const getTheCustomComponent = (data?: any) => {
    const newItem = customComponent[0]?.customArg({ 
      ...data?.original, 
      rowId: data?.id, 
      data: data?.original 
    })
    customComponent.shift()
    return newItem
  }

  return (
    <tbody 
      className={tableClasses.tbody}
      style={{ minHeight: minH ?? DEFAULT_MIN_HEIGHT }}
    >
      {table.getRowModel().rows.map((row: any) => {
        const isSelected = row.original?.selected
        const borderLeft = shouldShowBorder(trWithBorderLeft, row.original)

        return (
          <tr
            key={row.id}
            className={cn(
              tableClasses.tr,
              isSelected && tableClasses.trSelected
            )}
            style={isSelected ? {
              boxShadow: '0 0 0 2px rgb(59 130 246 / 0.5)'
            } : {}}
            role="row"
            aria-selected={isSelected}
          >
            {row.getVisibleCells().map((cell: any, index: number) => {
              const meta: any = cell.column.columnDef.meta
              const isActionCell = cell.id.includes('_action')
              const cellStyle = getCellStyle(cell, isActionCell)

              return (
                <td
                  key={cell.id}
                  className={cn(
                    tableClasses.td,
                    meta?.isNumeric && tableClasses.tdNumeric,
                    index === 0 && tableClasses.tdFirst,
                    index === row.getVisibleCells().length - 1 && tableClasses.tdLast,
                    customStyledTd
                  )}
                  style={{
                    ...cellStyle,
                    ...(index === 0 && borderLeft ? { borderLeft } : {}),
                  }}
                  role="cell"
                >
                  {customComponent && cell.id?.includes('customComponent')
                    ? getTheCustomComponent(row)
                    : !isActionCell && flexRender(cell.column.columnDef.cell, cell.getContext())}
                  
                  {isActionCell && _actions?.actions && (
                    <div className="flex items-center space-x-2">
                      {_actions.actions.map((action: any, actionIndex: number) => (
                        <Button
                          key={`${cell.id}-action-${actionIndex}`}
                          onClick={() => action.onClick({ ...row.original, rowId: row.id })}
                          aria-label={action.label || `Action ${actionIndex + 1}`}
                          title={action.label}
                          size="sm"
                          variant='solid'
                        className='w-8 h-8'
                          colorScheme={action.colorScheme || 'gray'}
                        >
                          {action.icon && (
                            <span className="w-3 h-3 mr-1" aria-hidden="true">
                              {action.icon}
                            </span>
                          )}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}