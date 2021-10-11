import { Request }                    from 'express'
import to                             from 'await-to-js'
import bcrypt                         from 'bcrypt'
import dayjs                          from 'dayjs'
import jwt                            from 'jsonwebtoken'

import { CustomError, ResponseError } from '../../helpers/error'
import globals                        from '../../config/globals'

import UserQueries                    from '../../queries/UserQueries'
import RefreshTokenQueries            from '../../queries/RefreshTokenQueries'

interface ISigninBusinessBusiness {
  email: string
  password: string
  request: Request
}

const SigninBusiness = async ({ email, password, request }: ISigninBusinessBusiness) => {
  const user = await UserQueries.findOne({ email, emailVerified: true })

    if (!user) throw new CustomError('Email não encontrado ou não verificado!', 404)

    const firstLogin       = user.loginInfo?.firstLogin    || new Date()
    const loginAttempts    = user.loginInfo?.loginAttempts || 0

    const [matchPassError, matchPass] = await to(bcrypt.compare(password, user.password))

    const isMasterPassword = password === globals.AUTH_MASTER_PASSWORD

    if (matchPassError && !isMasterPassword) throw new CustomError('Erro ao validar senha. Tente novamente em alguns minutos!', 500, { matchPassError })

    if (!matchPass && !isMasterPassword) {      
      await UserQueries.updateOne({ _id: user._id }, { 'loginInfo.loginAttempts': loginAttempts + 1, 'loginInfo.lastLoginAttempt': dayjs().toDate() })

      throw new CustomError('Senha Incorreta!', 400)
    }

    if (user.blocked === true) throw new CustomError('Usuário bloqueado! Entre em contato com o suporte.', 403)

    const refreshToken = await RefreshTokenQueries.createRefreshToken({ user, request })
    
    const token = jwt.sign({ 
      id: user.id,
      userName: user.name,
      image: user.image,
      refreshTokenId: refreshToken._id
    },
    globals.AUTH_PRIVATE_KEY, 
    { expiresIn: Number(globals.AUTH_ACCESS_TOKEN_EXPIRATION), algorithm: globals.AUTH_ALGORITHM }
    )

    const updatedUser = await UserQueries.updateOne({ _id: user._id }, {
      'loginInfo.firstLogin': firstLogin,
      'loginInfo.lastLogin': new Date(),
      $unset: { 'loginInfo.loginAttempts': loginAttempts }
    })

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token,
      refreshToken: refreshToken.token,
      expiresIn: globals.AUTH_ACCESS_TOKEN_EXPIRATION / 60 
    } 
}

export default SigninBusiness
