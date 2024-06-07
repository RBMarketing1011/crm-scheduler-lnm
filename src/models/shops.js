import { Schema, models, model } from 'mongoose'

const shopSchema = new Schema({
  name: {
    type: String,
    required: [ true, 'Shop name is required.' ]
  },
  nickname: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    required: [ true, 'Shop phone number is required.' ]
  },
  email: {
    type: String,
    default: null
  },
  website: {
    type: String,
    default: null
  },
  address: {
    address1: {
      type: String,
      required: [ true, 'Shop address is required.' ]
    },
    address2: {
      type: String,
      default: null
    },
    city: {
      type: String,
      required: [ true, 'Shop city is required.' ]
    },
    state: {
      type: String,
      required: [ true, 'Shop state is required.' ]
    },
    zip: {
      type: String,
      required: [ true, 'Shop zip code is required.' ]
    },
    fullAddress: {
      type: String,
      required: [ true, 'Full address is required.' ]
    }
  },
  customers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
    }
  ]
}, { timestamps: true })

const Shop = models.Shop || model('Shop', shopSchema)
export default Shop