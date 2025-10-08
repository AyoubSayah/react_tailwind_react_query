import { useCallback } from 'react'
import type { PaginationOptions } from '../types'
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
