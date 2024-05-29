import { Schema, models, model } from 'mongoose'

const emailTokenSchema = new Schema({
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
      now.setMinutes(now.getMinutes() + 15) // timestamp
      now = new Date(now) // Date object
      return now
    },
    required: true
  }
}, { timestamps: true })

const EmailToken = models.EmailToken || model('EmailToken', emailTokenSchema)
export default EmailToken