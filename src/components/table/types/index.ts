import type { VisibilityState } from '@tanstack/react-table'

export interface PaginationOptions {
  paginationFront?: boolean
  lastHref?: string
  page?: number
  totalPages?: number
  pageable?: {
    pageNumber: number
  }
}

export interface ActionType {
  name: string | ((data: any) => string)
  handleClick: (data: any) => void
  isDisabled?: (data: any) => boolean
  isShown?: boolean
  icon?: React.ReactNode
  colorScheme?: string
}

export interface Column {
  header: string
  accessor: string
  key?: string
  cell?: (value?: any, data?: any) => React.ReactNode | string
  actions?: ActionType[]
  size?: number
  getRowData?: boolean
  customEvent?: (columnToAccess: string) => void
  customArg?: (data: any) => any
}

export interface DataTableProps<TData extends Record<string, any>> {
  data: TData[]
  columns: Column[]
  title?: string
  minH?: string
  hasBorder?: boolean
  isLoading?: boolean
  paginationAction?: any
  extraPaginationOptions?: Record<string, any>
  payload?: any
  resetPagination?: boolean
  setCurrentPage?: (page: number) => void
  allowColumnVisibility?: boolean
  visibleColumns?: VisibilityState
  paginationOptions?: PaginationOptions
  resetPageIndex?: boolean
  customStyledTd?: string
  customStyledTh?: string
  trWithBorderLeft?: ((row: TData) => string) | boolean
  customLoader?: React.ReactNode
  pageSize?: number
}

export interface PaginationHookReturn {
  callApi: (page: number) => number | void
  getPaginationProps: (options: PaginationOptions) => any
  currentPageRef: React.MutableRefObject<number>
  pageCounterRef: React.MutableRefObject<number>
}
