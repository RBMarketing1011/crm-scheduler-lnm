import { Schema, models, model } from 'mongoose'
import Location from './locations'
import Employee from './employees'


const accountSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: [ true, 'Owner is required' ]
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