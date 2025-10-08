import { type FC, memo, useEffect, useState } from 'react'
import { indexOf, lastIndexOf, cn } from '../../utils/utilties'
import { tableClasses } from './styles'

interface PaginationProps {
  lastPage?: number
  firstPage?: number
  apiCall?: (page: number) => void
  page: number
}

const Pagination: FC<PaginationProps> = ({ firstPage = 1, lastPage = 1, apiCall, page }) => {
  const [paginationList, setPaginationList] = useState<(string | number)[]>([])
  const [currentPage, setCurrentPage] = useState<number>(page)

  useEffect(() => {
    if (lastPage < 5) {
      setPaginationList(Array.from({ length: lastPage }, (_, i) => i + 1))
    } else {
      setPaginationList([1, 2, 'spreader', lastPage - 1, lastPage])
    }
  }, [lastPage])

  useEffect(() => {
    if (page) {
      setCurrentPage(page)
      formatPagination(page)
    }
  }, [page])

  const formatPagination = (page: number) => {
    if (lastPage < 5) {
      setPaginationList(Array.from({ length: lastPage }, (_, i) => i + 1))
    } else if (firstPage === page) {
      setPaginationList([1, 2, 'spreader', lastPage - 1, lastPage])
    } else if (lastPage === page) {
      setPaginationList([1, 2, 'spreader', lastPage - 1, lastPage])
    } else if (lastPage - 1 === page) {
      setPaginationList([1, 2, 'spreader', page - 1, page, lastPage])
    } else {
      const list = Array.from(new Set([page - 1, page, page + 1, 'spreader', lastPage - 1, lastPage]))
      if (list[indexOf('spreader', list) + 1] === lastPage) {
        list.splice(indexOf('spreader', list), 1)
      }
      const element1 = list[lastIndexOf('spreader', list) - 1] as number
      const element2 = list[lastIndexOf('spreader', list) + 1]
      if (element1 + 1 === element2) {
        list.splice(lastIndexOf('spreader', list), 1)
      }
      if (page - 1 > 2) {
        list.unshift(1, 'spreader')
      } else if (page - 1 === 2) {
        list.unshift(1)
      }

      setPaginationList(list)
    }
  }

  const handleClick = (page: number) => {
    if (page === currentPage) return
    setCurrentPage(page)
    if (apiCall) apiCall(page - 1)
    formatPagination(page)
  }

  return (
    <div className="flex items-center justify-center w-full space-x-2">
      <button
        onClick={() => handleClick(firstPage)}
        disabled={currentPage === firstPage}
        className={cn(
          tableClasses.button,
          'flex items-center space-x-1',
          currentPage === firstPage && 'opacity-50 cursor-not-allowed'
        )}
        aria-label="Go to first page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <span>First</span>
      </button>

      {paginationList.map((item, index) =>
        item === 'spreader' ? (
          <div key={`spreader-${index}`} className="flex items-center justify-center w-8 h-8">
            <span className="text-sm font-medium text-gray-500">...</span>
          </div>
        ) : (
          <button
            key={`page-${item}-${index}`}
            onClick={() => {
              handleClick(typeof item === 'string' ? parseInt(item) : item)
            }}
            className={cn(
              tableClasses.button,
              currentPage === item && tableClasses.buttonActive
            )}
            aria-label={`Go to page ${item}`}
            aria-current={currentPage === item ? 'page' : undefined}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => handleClick(lastPage)}
        disabled={currentPage === lastPage}
        className={cn(
          tableClasses.button,
          'flex items-center space-x-1',
          currentPage === lastPage && 'opacity-50 cursor-not-allowed'
        )}
        aria-label="Go to last page"
      >
        <span>Last</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default memo(Pagination)