import express from "express"

import auth from './controllers/auth'
import unauth from './controllers/unauth'

const routes = express.Router()

const unauthRouter = express.Router()
const authRouter = express.Router()

routes.use('/unauth', unauthRouter)
routes.use('/auth', authRouter)

/* UNAUTH */
unauthRouter.use('/signup', unauth.SignupController)
unauthRouter.use('/signin', unauth.SigninController)
unauthRouter.use('/emails', unauth.EmailController)

/* AUTH */
authRouter.use('/ocr', auth.OcrController)
authRouter.use('/dashboard', auth.DashboardController)
authRouter.use('/items', auth.ItemsController)

export { routes }