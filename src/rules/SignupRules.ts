import requestCheck from 'request-check'

import validators from '../helpers/validators'
import { CustomError } from '../helpers/error'

const SignupRules = {
  signup: (...args: any) => {
    const validator = requestCheck()
    validator.requiredMessage = 'Campo obrigatório!';
    (validator as any).useFieldNameAsKey = true
    
    validator.addRule('email',{
      validator: (value: string) => validators.email(value),
      message: 'Email Inválido!'
    })
    
    validator.addRule('password', {
      validator: (password: string) =>  validators.validateOWSPPassword(password),
      message: `É obrigatório o uso de letra maiúscula, número, símbolo e no mínimo 8 letras!`
    })

    validator.addRule('confirmation', {
      validator: ({ password, confirmation }) => String(password) === String(confirmation),
      message: 'As senhas não coincidem!'
    })

    const invalid = validator.check(...args)
  
    if (invalid) throw new CustomError('Campos inválidos!', 412)
  }
}

export default SignupRules
