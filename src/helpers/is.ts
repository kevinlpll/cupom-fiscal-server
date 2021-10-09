import dayjs from 'dayjs'
import mongoose from 'mongoose'

const objectId = (variable: any): boolean =>
  Boolean(mongoose.Types.ObjectId.isValid(variable))

const number = (variable: any): boolean => !isNaN(variable)

const string = (variable: any): boolean =>
  typeof variable === 'string' || variable instanceof String

const array = (variable: any): boolean => Array.isArray(variable)

const date = (variable: string): boolean => !isNaN(new Date(variable).getDate())

const undef = (variable: any): boolean => typeof variable === 'undefined'

const positive = (variable: any): boolean => Boolean(Math.sign(variable))

const before = (variable: any): boolean => dayjs(variable).isBefore(dayjs())

const boolean = (variable: any): boolean =>
  ['true', true, 1, '1', 'false', false, 0, '0'].includes(variable)

const email = (variable: any): boolean =>
  /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(variable)

const object = (variable: any): boolean => typeof variable === 'object'

const zipcode = (variable: any): boolean =>
  typeof variable === 'string' && variable.length === 8

const stringNumber = (variables: any): boolean => !/\D/i.test(variables)

const truly = (variables: any): boolean =>
  ['true', true, 1, '1'].includes(variables)

const typeNumber = (variable: any): boolean => !isNaN(variable) && typeof variable === 'number'

export default {
  boolean,
  objectId,
  number,
  string,
  array,
  date,
  undef,
  positive,
  before,
  email,
  object,
  zipcode,
  stringNumber,
  truly,
  typeNumber
}
