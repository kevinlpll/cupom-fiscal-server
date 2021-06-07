import { Router } from "express"
import { createWorker } from "tesseract.js"

const multer = require('multer')
const upload = multer({ dest: 'tmp/upload' })
const routes = Router()
const fs = require('fs')

routes.get("/ping", (request, response) => {
  return response.json("pingou")
})

routes.post("/image", upload.single('image'), async (request, response) => {
  const filepath = request.file.path

  return response.send('aaaaa')

})


export { routes }