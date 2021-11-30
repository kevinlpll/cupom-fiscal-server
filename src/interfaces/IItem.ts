import { Document, Types } from 'mongoose'

export default interface IItem extends Document {
  name: string
  value: number
}
