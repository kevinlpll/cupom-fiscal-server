import fs from 'fs'
import multer from 'multer'
import to from 'await-to-js'
import mongoose from 'mongoose'
import { Router } from 'express'
import { createWorker } from "tesseract.js"
import dayjs from 'dayjs'

import uploader from '../../middlewares/uploader'

import { ResponseError, CustomError } from '../../helpers/error'

import Item from '../../models/Item'
import Cupon from '../../models/Cupon'

const ObjectId = mongoose.Types.ObjectId

const upload = multer({ dest: 'tmp/upload' })

const ItemsController = Router()

ItemsController.get('/', async (request, response) => {
  try {
    const [error, items] = await to(Item.find({}).exec()) 

    if (error) throw new CustomError('Ocorreu um erro ao buscar cupons!', 500)

    return response.send_ok('Usuário encontrado com sucesso!', { items })
  } catch (error) {
    return ResponseError(response, error.code, error.message, error.data)
  }
})


export default ItemsController