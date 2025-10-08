import React, { useEffect, useState } from 'react'
import { getCoreRowModel, getPaginationRowModel, useReactTable,  } from '@tanstack/react-table'

import { tableClasses } from './styles'
import { TableHeader, TableBody, TableFooter, Loader, EmptyState } from './components'
import { usePagination, useTableColumns, useTableEffects } from './hooks'
import { DEFAULT_PAGE_SIZE } from './constants/constants'
import type { DataTableProps } from './types'

const DataTable = <TData extends Record<string, unknown>>({
  data,
  columns,
  title,
  resetPagination,
  paginationAction,
  isLoading,
  minH,
  setCurrentPage,
  customLoader,
  paginationOptions = { paginationFront: true },
  visibleColumns,
  resetPageIndex = true,
  customStyledTd = "",
  customStyledTh = "",
  pageSize = DEFAULT_PAGE_SIZE
}: DataTableProps<TData>) => {
  const [columnVisibility, setColumnVisibility] = useState(visibleColumns || {})


  const tableColumns = useTableColumns(columns)
  //const actionsColumn = useMemo(() => columns.find((col) => col.actions?.length), [columns])

  const table = useReactTable({
    columns: tableColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
        pageIndex: 0,
      },
    },
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    autoResetPageIndex: false,
  })
  const { callApi, getPaginationProps, currentPageRef, pageCounterRef } = usePagination(
    paginationOptions,
    table.setPageIndex,
    pageSize,
    data
  )

  const { handleDataChange, handleResetPagination, handleEmptyData } = useTableEffects(
    table,
    paginationOptions,
    resetPageIndex,
    resetPagination,
    data,
    currentPageRef,
    pageCounterRef
  )

  // Effects
  useEffect(() => {
    if (visibleColumns) {
      setColumnVisibility(visibleColumns)
    }
  }, [visibleColumns])

  useEffect(() => {
    handleDataChange()
  }, [data, handleDataChange])

  useEffect(() => {
    handleResetPagination()
  }, [resetPagination, handleResetPagination])

  useEffect(() => {
    handleEmptyData()
  }, [data?.length, table.getRowModel().rows?.length, handleEmptyData])

  useEffect(() => {
    if (paginationAction && resetPagination !== true) {
      table.setPageIndex(currentPageRef.current)
      setCurrentPage?.(currentPageRef.current)
    }
  }, [currentPageRef.current, table.getState().pagination.pageIndex, pageCounterRef.current])

  const renderContent = () => {
    if (isLoading) {
      return <Loader customLoader={customLoader}  minH={minH} />
    }

    return (
      <>

        <table className={tableClasses.table} role="table">
          <TableHeader table={table} customStyledTh={customStyledTh} />
          <TableBody
            table={table}
            minH={minH}
            customStyledTd={customStyledTd}
            tableColumns={columns}
            data={data}
          />
        </table>

        <EmptyState data={data} table={table} />

        {table.getRowModel().rows?.length > 0 && (
          <TableFooter
            paginationOptions={paginationOptions}
            callApi={callApi}
            getPaginationProps={getPaginationProps}
          />
        )}
      </>
    )
  }

  return (
    <div className="w-full">
      {title && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden w-full min-w-60">
        {renderContent()}
      </div>
    </div>
  )
}

export default React.memo(DataTable)
