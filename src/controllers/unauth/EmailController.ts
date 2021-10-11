import { Request, Response, Router } from 'express'
import { CustomError, ResponseError } from '../../helpers/error'

import UserQueries from '../../queries/UserQueries'

const EmailController = Router()

EmailController.patch('/confirmation', async (request: Request, response: Response) => {
  const confirmationToken = request.body.confirmationToken

  try {

    const user = await UserQueries.findOne({ confirmationToken })

    if (!user) throw new CustomError('Email não encontrado!', 404)

    if (user.emailVerified) throw new CustomError('Email já confirmado!', 400)

    const existsUser = await UserQueries.exists({ email: user.email, emailVerified: true })

    if (existsUser) throw new CustomError('Email já utilizado, peça uma nova senha!', 400)

    await UserQueries.updateOne({ _id: user._id }, { emailVerified: true, $unset: { confirmationToken: null } })
    
    return response.send_ok('Email confirmado com sucesso!')
  } catch (error) {
    return ResponseError(response, error.code, error.message, error.data)
  }
})

export default EmailController