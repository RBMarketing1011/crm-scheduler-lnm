import { Schema, models, model } from 'mongoose'

const userEmailTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

const UserEmailToken = models.UserEmailToken || model('UserEmailToken', userEmailTokenSchema)
export default UserEmailToken