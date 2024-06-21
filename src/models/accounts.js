import { Schema, models, model } from 'mongoose'
import Shop from './shops'
import Employee from './employees'


const accountSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: [ true, 'Owner is required' ]
  },
  shops: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      default: null
    }
  ],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      default: null
    }
  ],
})
const Account = models.Account || model('Account', accountSchema)
export default Account