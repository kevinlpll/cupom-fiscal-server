import { Router } from "express"
import { createWorker } from "tesseract.js"

import fs from 'fs'
import multer from 'multer'

const upload = multer({ dest: 'tmp/upload' })
const routes = Router()

routes.get("/ping", (request, response) => {
  return response.json("pingou")
})

routes.post("/image", upload.single('image'), async (request, response) => {

  return response.send('aaaaa')

})


export { routes }