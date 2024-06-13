import { Schema, models, model } from 'mongoose'

const customerEmailTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  expiration: {
    type: Date,
    default: () =>
    {
      let now = new Date()
      now.setMinutes(now.getMinutes() + 30) // timestamp
      now = new Date(now) // Date object
      return now
    },
    required: true
  }
}, { timestamps: true })

const CustomerEmailToken = models?.CustomerEmailToken || model('CustomerEmailToken', customerEmailTokenSchema)
export default CustomerEmailToken