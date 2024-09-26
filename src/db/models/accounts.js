import { Schema, models, model } from 'mongoose'
import Location from './locations'
import Employee from './employees'


const accountSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: [ true, 'Owner is required' ]
  },
  name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
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
    }
  },
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Location',
    }
  ],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    }
  ],
})
const Account = models.Account || model('Account', accountSchema)
export default Account