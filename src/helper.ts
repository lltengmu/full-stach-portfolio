import { ValidationError } from 'class-validator'
import * as dayjs from 'dayjs'

export const parseErrors = (errors: ValidationError[]) => {
  return errors
    .map((i) => ({
      [i.property]: Object.entries(i.constraints).map(([key, message]) => message),
    }))
    .reduce((prev, i) => Object.assign(prev, i), {})
}

export const success = (message: string, data: any = {}, code = 0) => {
  return { message, data, code }
}

export const paginate = (data: { page: number; total: number; row: number; data: any[] }) => {
  return {
    meta: {
      current_page: data.page,
      row: data.row,
      total: data.total,
      page_row: Math.ceil(data.total / data.row),
    },
    data: data.data,
  }
}

export const url = (url: string) => {
  return process.env.APP_URL + '/' + url
}
