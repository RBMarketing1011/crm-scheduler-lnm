import { Schema, models, model } from 'mongoose'
import Shop from './shops'
import Vehicle from './vehicles'

const customerSchema = new Schema({
  "firstname": {
    type: String,
    required: [ true, 'First name is required.' ]
  },
  "lastname": {
    type: String,
    required: [ true, 'Last name is required.' ]
  },
  "email": {
    type: String,
    required: [ true, 'Email is required.' ]
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  "phone": [
    {
      type: String,
      unique: true,
      default: null
    }
  ],
  "vehicles": [
    {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle'
    }
  ],
  "customerType": {
    type: String,
    default: 'Person'
  },
  "contactFirstname": {
    type: String,
    default: null
  },
  "contactLastname": {
    type: String,
    default: null
  },
  "address": {
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
    fullAddress: {
      type: String,
      default: null
    }
  },
  "shopId": {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  "okForMarketing": {
    type: Boolean,
    default: true
  },
  "deletedDate": {
    type: String,
    default: null
  },
}, { timestamps: true })

const Customer = models.Customer || model('Customer', customerSchema)
export default Customer