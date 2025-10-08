import type { PaginationOptions, PaginationHookReturn } from '../types'
import { useRef, useCallback } from 'react'

export const usePagination = (
  paginationOptions: PaginationOptions | undefined,
  setPageIndex: (updater: number | ((old: number) => number)) => void,
  pageSize: number,
  data: unknown[]
): PaginationHookReturn => {
  const currentPageRef = useRef(0)
  const pageCounterRef = useRef(0)

  const callApi = useCallback(
    (page: number) => {
      if (paginationOptions?.paginationFront) {
        currentPageRef.current = page
        pageCounterRef.current = page
        setPageIndex(page)

        return page
      }




      return page
    },
    [paginationOptions]
  )

  const getPaginationProps = useCallback((options: PaginationOptions) => {
    if (options.paginationFront) {
      const lastPage = data ? Math.ceil(data?.length / pageSize) ?? 1 : 1
      return { lastPage }
    }

    if (options.totalPages) {
      return {
        lastPage: options.totalPages,
        page: (options.pageable?.pageNumber || 0) + 1,
      }
    }

    return {
      ...options,
      page: (options.pageable?.pageNumber || 0) + 1,
    }
  }, [data, pageSize])

  return {
    callApi,
    getPaginationProps,
    currentPageRef,
    pageCounterRef,
  }
}
