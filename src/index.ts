import express from "express"
import { routes } from  "./routes"
import cors from "cors"

const SERVER_PORT = 3333

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(process.env.PORT || SERVER_PORT,() => {
  console.log(`Server is running on port ${SERVER_PORT}`)
})

