import { Document, Types } from 'mongoose'

export default interface IRefreshToken extends Document {

  userName: string
  userId: Types.ObjectId
  token: string
  expiration: Date
  blackListed: boolean
  level: string
  device: string
  os: string
  ip: string
  filteredIp: string
  browser: string
  browserVersion: string
  rawUserAgent: string
  createdAt: Date
  updatedAt: Date
  lastUsed: Date

  expired(): boolean

}
