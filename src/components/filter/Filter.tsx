import React, { useMemo, useState } from 'react'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '../accordion'
import { Button } from '../button'
import { cn, isEmpty } from '../../utils/utilties'
import { Icon } from '../icon'

export type Option = { label: string; value: string }
export interface InputProps {
  sectionTitle?: string
  inputName: string
  inputType: 'text' | 'select' | 'date' | 'number' | 'email'
  inputLabel: string
  defaultValue?: string | Date
  multiple?: boolean
  options?: Option[]
  onChange?: (data: any) => void
}

export type FilterProps = {
  inputs?: InputProps[]
  submitButtonLabel?: string
  showClearButton?: boolean
  onSubmitData?: (data?: any) => void
  onPressClear?: (data?: any) => void
  dateFormat?: 'withDivider' | 'withoutDivider' | 'longDate'
  allowVariables?: boolean
  onValueChange?: (data: any) => void
  hideIcon?: boolean
  callApiOnClear?: boolean
  fieldsGap?: string | number
  additionalComponent?: React.ReactNode
  className?: string
} & (
  | { allowVariables?: false; initialVariables?: never }
  | { allowVariables: true; initialVariables?: Record<string, any> }
)

type VariableFilter = { key: string; value: string; operator: string }

const operatorOptions: Option[] = [
  { label: 'EQUALS', value: 'EQUALS' },
  { label: 'NOT_EQUALS', value: 'NOT_EQUALS' },
  { label: 'GREATER', value: 'GREATER' },
  { label: 'GREATER_OR_EQUALS', value: 'GREATER_OR_EQUALS' },
  { label: 'LESS', value: 'LESS' },
  { label: 'LESS_OR_EQUALS', value: 'LESS_OR_EQUALS' },
  { label: 'LIKE', value: 'LIKE' },
  { label: 'NOT_LIKE', value: 'NOT_LIKE' },
  { label: 'IN_LIST', value: 'IN_LIST' },
]

function formatDate(value: string | Date, fmt: FilterProps['dateFormat']) {
  const d = typeof value === 'string' ? new Date(value) : value
  if (fmt === 'withDivider') return d.toISOString()
  if (fmt === 'longDate') return d.toString()
  // withoutDivider (YYYY-MM-DD HH:mm:ss approx)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export default function Filter({
  inputs,
  onSubmitData = () => {},
  onPressClear,
  additionalComponent,
  dateFormat = 'withDivider',
  allowVariables = false,
  submitButtonLabel,
  showClearButton = true,
  hideIcon = false,
  callApiOnClear = true,
  fieldsGap = 12,
  className,
}: FilterProps) {
  const initialValues = useMemo(() => {
    const vals: Record<string, any> = {}
    inputs?.forEach((i) => (vals[i.inputName] = i.defaultValue ?? ''))
    if (allowVariables) vals['bpmVariableFilters'] = [] as VariableFilter[]
    return vals
  }, [inputs, allowVariables])

  const [values, setValues] = useState<Record<string, any>>(initialValues)
  const [dateErrors, setDateErrors] = useState<Record<string, boolean>>({})

  const setFieldValue = (name: string, value: any) => setValues((v) => ({ ...v, [name]: value }))

  const handleDateChange = (value: any, input: InputProps) => {
    setFieldValue(input.inputName, value)
    const nextErrors: Record<string, boolean> = {}
    if (input.inputName === 'endDate') nextErrors.endDate = !!(value && values['startDate'] && new Date(value) < new Date(values['startDate']))
    if (input.inputName === 'startDate') nextErrors.startDate = !!(value && values['endDate'] && new Date(value) > new Date(values['endDate']))
    if (input.inputName === 'toDate') nextErrors.toDate = !!(value && values['fromDate'] && new Date(value) < new Date(values['fromDate']))
    if (input.inputName === 'fromDate') nextErrors.fromDate = !!(value && values['toDate'] && new Date(value) > new Date(values['toDate']))
    setDateErrors((prev) => ({ ...prev, ...nextErrors }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const d: any = { ...values }
    if (Object.values(dateErrors).some(Boolean)) return

    Object.keys(d).forEach((key) => {
      if (isEmpty(d[key])) delete d[key]
      if (['startDate', 'endDate', 'secondStartDate', 'secondEndDate', 'dueAfter', 'dueBefore', 'fromDate', 'toDate'].includes(key) && d[key]) {
        d[key] = formatDate(d[key], dateFormat)
      }
      if (Array.isArray(d[key]) && d[key].length && d[key][0]?.label && d[key][0]?.value) {
        d[key] = d[key].map((it: any) => it.value)
      }
      if (d[key]?.label && d[key]?.value) d[key] = d[key].value
    })

    if (allowVariables) {
      if (d['bpmVariableFilters']) {
        d['bpmVariableFilters'] = (d['bpmVariableFilters'] as VariableFilter[]).filter((it) => it.key && it.value && it.operator)
      }
    }

    onSubmitData(d)
  }

  const clear = () => {
    setValues(initialValues)
    setDateErrors({})
    callApiOnClear && onSubmitData(initialValues)
    onPressClear?.()
  }

  return (
    <Accordion defaultIndex={[0]} allowToggle className={cn('my-2 w-full', className)}>
      <AccordionItem index={0}>
        <div className="flex w-full items-center justify-end px-1">
          {additionalComponent}
          <AccordionButton index={0} className="w-auto px-0 py-0 bg-transparent hover:bg-transparent">
            {!hideIcon && (
              <span aria-hidden="false" role="img" aria-label="open-filters" className="rounded-lg bg-primary-500 p-2 text-white hover:opacity-90 inline-flex items-center justify-center">
                <Icon displayName="filter" />
              </span>
            )}
          </AccordionButton>
        </div>
        <AccordionPanel index={0}>
          <form onSubmit={onSubmit} className="mt-6 mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4" style={{ gridAutoFlow: 'row wrap' }}>
              {inputs?.map((input) => (
                <div key={input.inputName} className="flex flex-col">
                  {input.inputType === 'date' ? (
                    <>
                      {input.sectionTitle && <span className="mb-1 text-sm font-semibold">{input.sectionTitle}</span>}
                      <label className="mb-1 text-xs text-slate-600">{input.inputLabel}</label>
                      <input
                        type="datetime-local"
                        value={values[input.inputName] ?? ''}
                        onChange={(e) => handleDateChange(e.target.value, input)}
                        className={cn('h-10 rounded-md border px-3', dateErrors[input.inputName] ? 'border-red-500' : 'border-gray-300')}
                      />
                      {dateErrors[input.inputName] && (
                        <span className="mt-1 text-xs text-red-600">Date range is invalid</span>
                      )}
                    </>
                  ) : input.inputType === 'select' ? (
                    <>
                      <label className="mb-1 text-xs text-slate-600">{input.inputLabel}</label>
                      <select
                        multiple={!!input.multiple}
                        value={values[input.inputName] ?? (input.multiple ? [] : '')}
                        onChange={(e) => {
                          if (input.multiple) {
                            const selected = Array.from(e.target.selectedOptions).map((o) => ({ label: o.label, value: o.value }))
                            setFieldValue(input.inputName, selected)
                            input.onChange?.(selected)
                          } else {
                            const selected = { label: e.target.selectedOptions[0]?.label, value: e.target.value }
                            setFieldValue(input.inputName, selected)
                            input.onChange?.(selected)
                          }
                        }}
                        className="h-10 rounded-md border border-gray-300 px-3"
                      >
                        {!input.multiple && <option value="">Select...</option>}
                        {input.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <label className="mb-1 text-xs text-slate-600">{input.inputLabel}</label>
                      <input
                        type={input.inputType}
                        value={values[input.inputName] ?? ''}
                        onChange={(e) => setFieldValue(input.inputName, e.target.value)}
                        placeholder={input.inputLabel}
                        className="h-10 rounded-md border border-gray-300 px-3"
                      />
                    </>
                  )}
                </div>
              ))}

              {allowVariables && Array.isArray(values.bpmVariableFilters) && (
                <>
                  {(values.bpmVariableFilters as VariableFilter[]).map((item: VariableFilter, index: number) => (
                    <React.Fragment key={`vf-${index}`}>
                      <div className="flex flex-col">
                        <label className="mb-1 text-xs text-slate-600">Variable name</label>
                        <input className="h-10 rounded-md border border-gray-300 px-3" value={item.key} onChange={(e) => {
                          const copy = [...values.bpmVariableFilters]
                          copy[index] = { ...copy[index], key: e.target.value }
                          setFieldValue('bpmVariableFilters', copy)
                        }}/>
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1 text-xs text-slate-600">Variable value</label>
                        <input className="h-10 rounded-md border border-gray-300 px-3" value={item.value} onChange={(e) => {
                          const copy = [...values.bpmVariableFilters]
                          copy[index] = { ...copy[index], value: e.target.value }
                          setFieldValue('bpmVariableFilters', copy)
                        }}/>
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1 text-xs text-slate-600">Variable operator</label>
                        <select className="h-10 rounded-md border border-gray-300 px-3" value={item.operator} onChange={(e) => {
                          const copy = [...values.bpmVariableFilters]
                          copy[index] = { ...copy[index], operator: e.target.value }
                          setFieldValue('bpmVariableFilters', copy)
                        }}>
                          <option value="">Select operator</option>
                          {operatorOptions.map((op) => (
                            <option key={op.value} value={op.value}>{op.label}</option>
                          ))}
                        </select>
                      </div>
                    </React.Fragment>
                  ))}
                </>
              )}

              <div className="col-span-full flex items-end justify-end gap-2 pt-2">
                {allowVariables && (
                  <Button size="sm" colorScheme="primary" onClick={(e) => {
                    e.preventDefault()
                    const next = [ ...(values.bpmVariableFilters ?? []), { key: '', value: '', operator: '' } ]
                    setFieldValue('bpmVariableFilters', next)
                  }}>
                    <Icon displayName="plus" className="mr-2" /> Add variable
                  </Button>
                )}

                <Button type="submit" colorScheme="primary">{submitButtonLabel ?? 'Search'}</Button>
                {showClearButton && (
                  <Button variant="outline" onClick={(e) => { e.preventDefault(); clear() }}>Clear</Button>
                )}
              </div>
            </div>
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
