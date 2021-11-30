import mongoose from 'mongoose'

import IItem from '../interfaces/IItem'

interface IItemModel extends mongoose.Model<IItem> {}

const ObjectId = mongoose.Types.ObjectId

const Schema = {
  value: Number, 
  name: String
}


const Item: mongoose.Schema = new mongoose.Schema(Schema, { timestamps: true })

export default mongoose.model<IItem, IItemModel>('Item', Item)
