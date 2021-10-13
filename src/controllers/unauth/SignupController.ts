import { Request, Response, Router } from 'express'

import { ResponseError } from '../../helpers/error'
import SignupRules from '../../rules/SignupRules'
import SignupBusiness from '../../services/Signup/SignupBusiness'

const SignupController = Router()

SignupController.post('/', async (request: Request, response: Response) => {
  const { email, password, confirmPassword } = request.body

  try {
    SignupRules.signup(
      { email }, 
      { password }, 
      { confirmPassword: { password, confirmPassword } }
    )

    const user = await SignupBusiness({ email, password })

    return response.send_ok('Cadastro realizado com sucesso!')
  } catch (error) {
    return ResponseError(response, error.code, error.message, error.data)
  }

})

export default SignupController