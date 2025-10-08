import { twMerge } from 'tailwind-merge'

const lastIndexOf = (item:string ,array: unknown[]) => {
  return array.lastIndexOf(item)
}

const indexOf = (item:string ,array: unknown[]) => {
  return array.indexOf(item)
}

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return twMerge(classes.filter(Boolean).join(' '))
}
const isEmpty = (value: unknown) => {
  return value === undefined || value === null || value === ''
}
export { lastIndexOf, indexOf, cn, isEmpty }