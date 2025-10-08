import React from 'react'
import Pagination from '../Pagination'
import { tableClasses } from '../styles'

interface TableFooterProps {
  paginationOptions: any
  callApi: (page: number) => void
  getPaginationProps: (options: any) => any
}

export const TableFooter: React.FC<TableFooterProps> = ({ 
  paginationOptions, 
  callApi, 
  getPaginationProps 
}) => {
  if (!paginationOptions) return null

  return (
    <nav className={tableClasses.pagination} aria-label="Table pagination">
      <Pagination 
        page={1} 
        apiCall={callApi} 
        {...getPaginationProps(paginationOptions)} 
      />
    </nav>
  )
}