import mongoose from 'mongoose'

import ICupon from '../interfaces/ICupon'

interface ICuponModel extends mongoose.Model<ICupon> {}

const ObjectId = mongoose.Types.ObjectId

const Schema = {
  number: Number,
  itemsQuantity: Number,
  store: String,
  items: {
    type: [new mongoose.Schema({
      _id: ObjectId, 
      quantity: Number, 
      value: Number, 
      name: String
    })],
    default: undefined
  }
}


const Cupon: mongoose.Schema = new mongoose.Schema(Schema, { timestamps: true })

export default mongoose.model<ICupon, ICuponModel>('Cupon', Cupon)
