import { Request, Response, Router } from 'express'

import { ResponseError } from '../../helpers/error'
import SigninBusiness    from '../../services/Signin/SigninBusiness'
import SigninRules       from '../../rules/SigninRules'

const SigninController = Router()

SigninController.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body

  try {
    SigninRules.signin({ email }, { password })

    const signin = await SigninBusiness({ email, password, request })

    return response.send_ok('Usuário encontrado com sucesso!', { signin })
  } catch (error) {
    return ResponseError(response, error.code, error.message, error.data)
  }
})

export default SigninController