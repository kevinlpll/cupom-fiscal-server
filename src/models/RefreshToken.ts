import mongoose from 'mongoose'

import IRefreshToken from '../interfaces/IRefreshToken'

interface IRefreshTokenModel extends mongoose.Model<IRefreshToken> {}

const ObjectId = mongoose.Types.ObjectId

const Schema = {
  token: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },

  expiration: {
    type: Date,
    required: true
  },

  lastUsed: {
    type: Date,
    required: false
  },

  blackListed: {
    type: Boolean,
    default: false,
    required: true
  },

  device: {
    type: String,
    trim: true
  },

  os: {
    type: String,
    trim: true
  },

  ip: {
    type: String,
    trim: true
  },

  filteredIp: {
    type: String,
    trim: true
  },

  browser: {
    type: String,
    trim: true
  },

  browserVersion: {
    type: String,
    trim: true
  },

  rawUserAgent: {
    type: String,
    trim: false
  },

  userName: {
    type: String,
    trim: true
  },

  userId: {
    type: ObjectId,
    ref: 'User'
  }
}


const RefreshToken: mongoose.Schema = new mongoose.Schema(Schema, { timestamps: true })

export default mongoose.model<IRefreshToken, IRefreshTokenModel>('RefreshToken', RefreshToken)
