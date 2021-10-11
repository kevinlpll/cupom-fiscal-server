import to from 'await-to-js'
import mongoose from 'mongoose'
import randToken from 'rand-token'
import dayjs from 'dayjs'

import RefreshToken from '../models/RefreshToken'
import IRefreshToken from '../interfaces/IRefreshToken'

import IUser from '../interfaces/IUser'

import { CustomError } from '../helpers/error'
import globals from '../config/globals'

const ObjectId = mongoose.Types.ObjectId

class RefreshTokenQueries { 
  async createRefreshToken ({ user, request }: { user: IUser, request: any }) {

    const [tokenError, refreshToken] = await to(
      RefreshToken.create({
        userName: request.userName,

        token: randToken.uid(256),
        userId: user._id,
        expiration: dayjs().add(Number(globals.AUTH_REFRESH_TOKEN_EXPIRATION), 'seconds'),
        device: request.device,
        ip: request.ip,
        filteredIp: request.filteredIp,
        os: request.os,
        browser: request.browser,
        browserVersion: request.browserVersion,
        rawUserAgent: request.rawUserAgent
      })
    )

    if(tokenError)  throw new CustomError('Erro ao gerar o token', 500, tokenError)

    if (!refreshToken) throw new CustomError('Erro, token não gerado', 500, null)

    return refreshToken
  }

}

export default new RefreshTokenQueries()