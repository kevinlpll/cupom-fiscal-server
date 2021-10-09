import mongoose from 'mongoose'

import globals from '../config/globals'
import IUser from '../interfaces/IUser'

interface IUserModel extends mongoose.Model<IUser> {}

const Schema = {
  emailVerified: {
    type: Boolean,
    required: true,
    default: false
  },

  password: {
    type: String,
    required: true,
  },

  confirmationToken: {
    type: String
  }, 
  
  birthDate: {
    type: Date
  },
  
  gender: {
    type: String,
    enum: globals._genders
  },

  affiliate: {
    type: Boolean,
  },
  
  /* Ref Attributes */
  
  image: {
    type: String
  },
   
  name: {
    type: String,
    trim: true
  },
  
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true
  },

  cellphone: {
    type: String,
    trim: true
  },

  blocked: {
    type: Boolean,
    default: false
  },

  /* Access Attributes */
  loginInfo: {
    firstLogin: {
      type: Date
    },

    lastLogin: {
      type: Date
    },

    lastLogout: {
      type: Date
    },

    loggedTime: {
      type: Number
    },

    lastLoginAttempt: {
      type: Date
    },

    loginAttempts: {
      type: Number,
      default: 0
    }
  }
}

const User: mongoose.Schema = new mongoose.Schema(Schema, {
  collection: 'users',
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true
})

export default mongoose.model<IUser, IUserModel>('User', User)
