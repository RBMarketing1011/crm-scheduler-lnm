import { Schema, models, model } from 'mongoose'
import Customer from './customers'

const locationSchema = new Schema({
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
      ref: 'Customer',
    }
  ],
  hoursOfOp: {
    weekdays: {
      open: {
        type: String,
        default: null
      },
      close: {
        type: String,
        default: null
      },
    },
    weekends: {
      open: {
        type: Boolean,
        default: false
      },
      days: {
        type: String,
        default: null
      },
      open: {
        type: String,
        default: null
      },
      close: {
        type: String,
        default: null
      },
    }
  },
  tekMetricIntegration: {
    locationId: {
      type: String,
      default: null
    },
    connected: {
      type: Boolean,
      default: false
    }
  }
}, { timestamps: true })

const Location = models.Location || model('Location', locationSchema)
export default Location