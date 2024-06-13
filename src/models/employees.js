import { Schema, models, model } from 'mongoose'

const employeeSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  shops: [
    {
      type: String
    }
  ],
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
    default: null
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
  employeeRole: {
    type: String,
    required: true,
    default: 'employee'
  },
  deletedDate: {
    type: Date,
    default: null
  }
}, { timestamps: true })

const Employee = models?.Employee || model('Employee', employeeSchema)
export default Employee