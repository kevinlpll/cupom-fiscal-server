import to from 'await-to-js'
import mongoose from 'mongoose'

import User from '../models/User'
import IUser from '../interfaces/IUser'

import { CustomError } from '../helpers/error'
import dayjs from 'dayjs'

class UserQueries {  
  async findById (id: string | mongoose.Types.ObjectId, select = []): Promise<IUser> {
    const [error, user] = await to(User.findById(id).select(select).exec())

    if (error) throw new CustomError('Ocorreu um erro ao buscar o usuário!', 500, { error })

    if (!user) throw new CustomError('Usuário não encontrado!', 404, { error })

    return user
  }

  async findOne(search) {
    const [error, user] = await to(User.findOne(search).exec())
    if (error) {
      console.warn({ error })
      throw new CustomError('Ocorreu um erro ao buscar o usuário!', 500, { error })
    }

    return user
  }

  async exists (search): Promise<boolean | undefined> {
    const [error, user] = await to(User.exists(search))

    if (error) throw new CustomError('Ocorreu um erro ao buscar o usuário!', 500, { error })

    return user
  }

  async create (property, options = {}): Promise<IUser> {
    const [error, user] = await to(User.create([property], options))
    
    if (error || !user) throw new CustomError('Ocorreu um erro ao buscar o usuário!', 500, { error })

    return user[0]
  }

  async findMany (property, select = []): Promise<IUser[] | undefined> {
    const [error, users] = await to(User.find(property).select(select).exec())

    if (error) throw new CustomError('Ocorreu um erro ao buscar usuários!', 500, { error })

    return users
  }

  async updateOne (search, update) {
    const [error, user] = await to(User.updateOne(search, update).exec())

    if (error) throw new CustomError('Ocorreu um erro ao buscar o usuário!', 500, { error })

    return user
  }

  async updateMany (search, update) {
    const [error, users] = await to(User.updateMany(search, update).exec())

    if (error) throw new CustomError('Ocorreu um erro ao atualizar usuário!', 500, { error })

    return users
  }

  // async logout (user: IUser, lastLogout: Date): Promise<void> {
  //   const timeDiff = dayjs(lastLogout).diff(user.loginInfo.lastLogin)
  //   const loggedTime = Number(user.loginInfo.loggedTime ?? 0) + Number(timeDiff)

  //   const [error, loggedOutUser] = await to(User.updateOne({ _id: user._id }, {
  //     $set: { 'loginInfo.lastLogout': lastLogout, 'loginInfo.loggedTime': loggedTime }
  //   }).exec())

  //   if (error) throw new CustomError('Ocorreu um erro ao atualizar o usuário!', 500, { error })
  // }
}

export default new UserQueries()
