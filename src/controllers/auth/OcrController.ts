import fs from 'fs'
import multer from 'multer'
import to from 'await-to-js'
import mongoose from 'mongoose'
import { Router } from 'express'
import { createWorker } from "tesseract.js"
import { ResponseError, CustomError } from '../../helpers/error'

import Cupon from '../../models/Cupon'

const ObjectId = mongoose.Types.ObjectId

const upload = multer({ dest: 'tmp/upload' })

const ocrController = Router()

ocrController.post("/", upload.single('image'), async (request, response) => {
  console.log(request.file)

  const filepath = request.file.path
  try {
    // const worker = createWorker({
    //   langPath: 'tmp/traineddata',
    //   gzip: false
    // })

    // await worker.load()
    // await worker.loadLanguage('por')
    // await worker.initialize('por')
    // const { data: { text } } = await worker.recognize(filepath)
    // await worker.terminate()

    // fs.unlink(filepath, (error) => {
    //   if (error)
    //     console.error(error)
    // })

    // const item = {
    //   _id: ObjectId(),
    //   name: 'batata',
    //   value: 5
    // }
    
    // const cupon = {
      // number: 32,
      // itemsQuantity: 5,
      // store: 'batatinha um dois',
      // items: [
      //   { _id: ObjectId(''), quantity: 2, value: 2, name: 'Leite intgral' },
      //   { _id: ObjectId(''), quantity: 2, value: 5, name: 'batata' },
      //   { _id: ObjectId(''), quantity: 1, value: 30, name: 'Queijo' },
      // ]
    // }

    const [err, cupon] = await to(Cupon.create({
      number: 32,
      itemsQuantity: 5,
      store: 'batatinha um dois',
      items: [
        { _id: new ObjectId(), quantity: 2, value: 2, name: 'Leite intgral' },
        { _id: new ObjectId(), quantity: 2, value: 5, name: 'batata' },
        { _id: new ObjectId(), quantity: 1, value: 30, name: 'Queijo' },
      ]
    }))

    if (err || !cupon) return response.send_internalServerError('Ocorreu um erro ao criar cupon, por favor tente mais tarde!')


    return response.status(200).send(cupon.toJSON())
  } catch (error) {
    fs.unlink(filepath, (error) => {
      if (error)
        console.error(error)
    })
    return response.status(400).json(error)
  }

})

ocrController.get('/', async (request, response) => {

  try {
    
    const [error, cupons] = await to(Cupon.find({}).exec()) 

    if (error) throw new CustomError('Ocorreu um erro ao buscar cupons!', 500)

    return response.send_ok('Usuário encontrado com sucesso!', { cupons })
  } catch (error) {
    return ResponseError(response, error.code, error.message, error.data)
  }
})


export default ocrController