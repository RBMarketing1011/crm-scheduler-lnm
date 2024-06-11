import { Schema, models, model } from 'mongoose'

const userSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
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
  image: {
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
  emailVerified: {
    type: Boolean,
    default: false
  },
  deletedDate: {
    type: Date,
    default: null
  }
}, { timestamps: true })

const User = models.User || model('User', userSchema)
export default User