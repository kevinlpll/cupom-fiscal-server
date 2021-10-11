import { Document } from 'mongoose'

export default interface IUser extends Document {
  birthDate: Date
  name: string
  gender: string
  
  image: string
  cellphone: number
  email: string
  password: string
  emailVerified: Boolean

  confirmationToken: string

  blocked: boolean

  loginInfo?: {
    firstLogin?: Date,
    lastLogin?: Date
    lastLogout?: Date
    loggedTime?: number
    lastLoginAttempt?: Date
    loginAttempts?: number
  }
}
