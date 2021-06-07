"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _tesseractjs = require('tesseract.js');

const multer = require('multer')
const upload = multer({ dest: 'tmp/upload' })
const routes = _express.Router.call(void 0, )
const fs = require('fs')

routes.get("/ping", (request, response) => {
  response.json("pingou")
})

routes.post("/image", upload.single('image'), async (request, response) => {
  const filepath = request.file.path

  return response.send('aaaaa')
  try {
    const worker = _tesseractjs.createWorker.call(void 0, {
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


exports.routes = routes;