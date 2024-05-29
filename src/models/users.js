import mongoose from 'mongoose'

const { Schema, model, models } = mongoose

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [ true, 'Please provide your first name' ]
  },
  lastname: {
    type: String,
    required: [ true, 'Please provide your last name' ]
  },
  email: {
    type: String,
    required: [ true, 'Please provide your email' ],
    unique: [ true, 'Email already in use' ]
  },
  password: {
    type: String,
    required: [ true, 'Please provide your password' ],
  },
  phone: [
    {
      number: {
        type: String,
        default: null
      },
      type: {
        type: String,
        default: null
      },
      primary: {
        type: Boolean,
        default: null
      }
    }
  ],
  address: {
    address1: {
      type: String,
      default: null
    },
    address2: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    zip: {
      type: String,
      default: null
    },
    streetAddress: {
      type: String,
      default: null
    },
    fullAddress: {
      type: String,
      default: null
    }
  },
  okForMarketing: {
    type: Boolean,
    default: true
  },
  deletedDate: {
    type: Date,
    default: null
  }
}, { timestamps: true })

const User = models.User || model('User', userSchema)
export default User