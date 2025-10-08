import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import type { PaginationOptions, Column } from '../types'
import { getDisplayedColumns } from '../utils'
import { isEmpty } from '../../../utils/utilties'
export const useTableColumns = (columns: Column[]) => {
  const columnHelper = createColumnHelper<any>()
  const { t } = useTranslation()

  return useMemo(() => {
    const displayedColumns = getDisplayedColumns(columns)

    return displayedColumns.map((column) =>
      columnHelper.accessor(column.accessor, {
        cell: (info) => {
          if (column.getRowData) {
            return column.cell?.(info.row.original)
          }

          if (column.cell) {
            return column.cell(info.getValue())
          }

          const value = info.getValue()
          if ((isEmpty(value) || !value) && column.header !== 'Actions') {
            return '-'
          }

          return value
        },
        header: column.header,
        size: column.size,
      })
    )
  }, [columns, columnHelper, t])
}

export const useTableEffects = (
  table: any,
  paginationOptions: PaginationOptions | undefined,
  resetPageIndex: boolean,
  resetPagination: boolean | undefined,
  data: any[],
  currentPageRef: React.MutableRefObject<number>,
  pageCounterRef: React.MutableRefObject<number>
) => {
  const resetTablePagination = useCallback(() => {
    table.setPageIndex(0)
    currentPageRef.current = 0
    pageCounterRef.current = 0
  }, [table, currentPageRef, pageCounterRef])

  // Effect for data changes
  const handleDataChange = useCallback(() => {
    if (paginationOptions?.paginationFront && resetPageIndex) {
      resetTablePagination()
    }
  }, [paginationOptions?.paginationFront, resetPageIndex, resetTablePagination])

  // Effect for reset pagination
  const handleResetPagination = useCallback(() => {
    if (resetPagination === true) {
      resetTablePagination()
    }
  }, [resetPagination, resetTablePagination])

  // Effect for empty data
  const handleEmptyData = useCallback(() => {
    if (data?.length && table.getRowModel().rows?.length === 0) {
      table.setPageIndex(0)
      currentPageRef.current = 0
    }
  }, [data?.length, table, currentPageRef])

  return {
    handleDataChange,
    handleResetPagination,
    handleEmptyData,
  }
}
