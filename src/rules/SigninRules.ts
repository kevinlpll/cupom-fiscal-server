import requestCheck from 'request-check'

import is              from '../helpers/is'
import validators      from '../helpers/validators'
import { CustomError } from '../helpers/error'

const SigninRules = {
  signin: (...args: any) => {
    const validator = requestCheck()
    validator.requiredMessage = 'Campo obrigatório!';
    (validator as any).useFieldNameAsKey = true
    
    validator.addRule('email',{
      validator: (value: string) => validators.email(value),
      message: 'Email Inválido!'
    })
    
    validator.addRule('password', {
      validator: (password: string) =>  is.string(password),
      message: `Necessário informar uma senha!`
    })

    const invalid = validator.check(...args)
  
    if (invalid) throw new CustomError('Campos inválidos!', 412, { invalid })
  }
}

export default SigninRules
