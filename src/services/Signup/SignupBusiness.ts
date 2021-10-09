import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserQueries from '../../queries/UserQueries'
import { CustomError } from '../../helpers/error'
import globals from '../../config/globals'

interface IBlockCorporationBusiness {
  email: string
  password: string
}

const SignupBusiness = async ({ email, password }: IBlockCorporationBusiness) => {
  const existsUser = await UserQueries.exists({
    emailVerified: true,
    email
  })

  if (existsUser) throw new CustomError('Email já cadastrado!', 400)

  const token = jwt.sign({}, globals.AUTH_PRIVATE_KEY, { expiresIn: 21600, algorithm: globals.AUTH_ALGORITHM })
  const encryptedPass = await bcrypt.hash(password, 14)

  const createData = {
    email,
    password: encryptedPass,
    confirmationToken: token
  }

  const user = await UserQueries.create(createData)

  return user
}

export default SignupBusiness
