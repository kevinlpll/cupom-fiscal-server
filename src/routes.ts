import { Router } from "express"
import { createWorker } from "tesseract.js"

const multer = require('multer')
const upload = multer({ dest: 'tmp/upload' })
const routes = Router()
const fs = require('fs')

routes.get("/ping", (request, response) => {
  response.json("pingou")
})

routes.post("/image", upload.single('image'), async (request, response) => {
  const filepath = request.file.path

  try {
    const worker = createWorker({
      langPath: 'tmp/traineddata',
      gzip: false
    })

    await worker.load()
    await worker.loadLanguage('por')
    await worker.initialize('por')
    const { data: { text } } = await worker.recognize(filepath)
    await worker.terminate()

    fs.unlink(filepath, (error) => {
      if (error)
        console.error(error)
    })


    return response.status(200).send(text)
  } catch (error) {
    fs.unlink(filepath, (error) => {
      if (error)
        console.error(error)
    })
    return response.status(400).json(error)
  }

})


export { routes }