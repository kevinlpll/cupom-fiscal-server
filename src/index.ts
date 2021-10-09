import timeout   from 'connect-timeout'
import express   from 'express'
import cors      from 'cors'
import responser from 'responser'

import listen from './middlewares/listen'
import requests from './middlewares/requests'

import { routes } from  './routes'
import globals from './config/globals'
import database from './config/database'

const SERVER_PORT = 3333

const app = express()

database()

app.use(cors())
app.use(express.json())

app.use(timeout(`100000s`))
app.use(requests)
app.use(responser)

app.use(routes)

app.listen(globals.PORT, globals.IP, listen)
