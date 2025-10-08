import type { Column } from '../types'
import { BORDER_COLORS } from '../constants/constants'

export const getBorderColor = (status: string): string => {
  return BORDER_COLORS[status as keyof typeof BORDER_COLORS] || BORDER_COLORS.default
}

export const getDisplayedColumns = (columns: Column[]): Column[] => {
  const actionsColumn = columns.find((col) => col.actions?.length)
  const hasVisibleActions = actionsColumn?.actions?.some((action) => action.isShown !== false)

  return hasVisibleActions ? columns : columns.filter((col) => col.header !== 'Actions')
}

export const getCellStyle = (cell: any, isActionCell: boolean) => {
  if (isActionCell) {
    return {
      maxWidth: 200,
      minWidth: 80,
      width: 80,
    }
  }

  return {
    width: cell.column.getSize() !== 150 ? cell.column.getSize() : 200,
  }
}

export const shouldShowBorder = (
  trWithBorderLeft: ((row: any) => string) | boolean | undefined,
  row: any
): string | undefined => {
  if (!trWithBorderLeft) return undefined

  if (typeof trWithBorderLeft === 'function') {
    return `5px solid ${trWithBorderLeft(row)}`
  }

  return `5px solid ${getBorderColor(row?.status)}`
}
