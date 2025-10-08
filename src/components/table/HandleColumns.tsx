import React, { useState } from 'react'
import type { ChangeEvent, FC, ReactElement } from 'react'
import { Icon } from '../icon'
import { cn } from '../../utils/utilties'
import { Popover } from '../popover'
import { Button, type ButtonVariant } from '../button'

interface IVisiblleColumns {
  [key: string]: boolean
}

interface IChildren {
  visibleColumns: IVisiblleColumns
}

interface ILabelColumns {
  [key: string]: string
}

interface HandleColumnsProps {
  initialVisibleColumns: IVisiblleColumns
  children: (props: IChildren) => ReactElement
  labelColumns?: ILabelColumns
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  className?: string
  customTrigger?: React.ReactNode
}

const HandleColumns: FC<HandleColumnsProps> = ({
  initialVisibleColumns,
  children,
  labelColumns,
  ...props
}) => {
  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns)
  const [isOpen, setIsOpen] = useState(false)


  const handleChangeColumnStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setVisibleColumns({
      ...visibleColumns,
      [e.target.id]: e.target.checked,
    })
  }




  return (
    <div className="flex items-center gap-2 mb-2 flex-col">
      <Popover
        containerClassName='ml-auto'
        trigger={<Button
          onClick={() => setIsOpen(!isOpen)}
          {...props}
        >
          <Icon
            displayName="setting-2"
            size="md"
            className="mr-2"
          />
          <span className="font-semibold">Add Columns</span>
          <Icon
            displayName="chevron-down"
            size="sm"
            className={cn(
              "ml-2 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </Button>}
      >

        <div
        >
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Columns</h3>
          </div>
          <div className="py-2 max-h-64 overflow-y-auto">
            {Object.keys(visibleColumns).map((column) => (
              <div
                key={column}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault()
                  const checkbox = e.currentTarget.querySelector('input[type="checkbox"]') as HTMLInputElement
                  if (checkbox) {
                    checkbox.checked = !checkbox.checked
                    handleChangeColumnStatus({ target: checkbox } as ChangeEvent<HTMLInputElement>)
                  }
                }}
              >
                <input
                  type="checkbox"
                  id={column}
                  checked={visibleColumns[column] as boolean}
                  onChange={handleChangeColumnStatus}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                  aria-label={`Toggle ${column} column visibility`}
                  onClick={(e) => e.stopPropagation()}
                />
                <label
                  htmlFor={column}
                  className="text-sm text-gray-700 cursor-pointer flex-1"
                >
                  {labelColumns && labelColumns[column] ? labelColumns[column] : column}
                </label>
              </div>
            ))}
          </div>
        </div>


   
      </Popover>
      {children({
          visibleColumns,
        })}

    </div>
  )
}

export default HandleColumns