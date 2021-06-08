"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _tesseractjs = require('tesseract.js');

var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

const upload = _multer2.default.call(void 0, { dest: 'tmp/upload' })
const routes = _express.Router.call(void 0, )

routes.get("/ping", (request, response) => {
  return response.json("pingou")
})

routes.post("/image", upload.single('image'), async (request, response) => {
  console.log(request)

  const filepath = request.file.path
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

    _fs2.default.unlink(filepath, (error) => {
      if (error)
        console.error(error)
    })


    return response.status(200).send(text)
  } catch (error) {
    _fs2.default.unlink(filepath, (error) => {
      if (error)
        console.error(error)
    })
    return response.status(400).json(error)
  }

})


exports.routes = routes;