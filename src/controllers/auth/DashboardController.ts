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

const DashboardController = Router()

DashboardController.get('/', async (request, response) => {
  const { type = 'quantity' } = request.query
  
  try {
    let pastDate = dayjs().subtract(6, 'days')
    const graphic = {}
    const count = {}
     
    do {
      const [, cupons] = await to(Cupon.find({ createdAt: { $gte: pastDate.startOf('day').toDate(), $lte: pastDate.endOf('day').toDate() }}).exec()) 

      if (!cupons) {
        graphic[pastDate.format('YYYY-MM-DD')] = 0 
        continue
      }

      graphic[pastDate.format('YYYY-MM-DD')] = cupons?.reduce((acc, cupon) => {
        if (type === 'value') {
          const value = cupon.items.reduce((acc2, item) => acc2 + item.value, 0)
          return acc + value
        }

        return acc + (cupon.itemsQuantity || 0)
      }, 0)
      pastDate = pastDate.add(1, 'day')
    } while (dayjs().diff(pastDate) > 0)

    const [error, cupons] = await to(Cupon.find({ createdAt: { $gte: dayjs().startOf('month').toDate(), $lte: dayjs().endOf('month').toDate() } }).exec()) 

    if (error || !cupons) return response.send_internalServerError('Ocorreu um erro ao criar cupon, por favor tente mais tarde!')

    count['cupon'] = cupons?.reduce((acc, cupon) => {
      if (type === 'value') {
        const value = cupon.items.reduce((acc2, item) => acc2 + item.value, 0)
        return acc + value
      }

      return acc + (cupon.itemsQuantity || 0)
    }, 0)

    const [error2, items] = await to(Item.find({ createdAt: { $gte: dayjs().startOf('month').toDate(), $lte: dayjs().endOf('month').toDate() } }).exec()) 

    if (error2 || !items) return response.send_internalServerError('Ocorreu um erro ao criar cupon, por favor tente mais tarde!')

    count['items'] = items.length

    return response.send_ok('Usuário encontrado com sucesso!', { graphic, count })
  } catch (error) {
    return ResponseError(response, error.code, error.message, error.data)
  }
})


export default DashboardController