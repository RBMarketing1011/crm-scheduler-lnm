import { Schema, model, models } from 'mongoose'


const accountSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [ true, 'Owner is required' ]
  },
  shops: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      default: null
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  ],
})
const Account = models.Account || model('Account', accountSchema)
export default Account