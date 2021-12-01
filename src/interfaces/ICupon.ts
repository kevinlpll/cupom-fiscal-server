import { Document, Types } from 'mongoose'

export default interface ICupon extends Document {

  number: number,
  itemsQuantity: number,
  store: string
  image: string
  items: {
    _id: Types.ObjectId, 
    quantity: number, 
    value: number, 
    name: string
  }[]

}
