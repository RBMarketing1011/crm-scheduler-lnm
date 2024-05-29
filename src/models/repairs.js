import mongoose from 'mongoose'

const { Schema, model, models } = mongoose

const repairSchema = new Schema({
  "shopId": {
    type: Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  "status": {
    type: String,
    required: true,
    default: 'Work Not Started'
  },
  "statusColor": {
    type: String,
    default: '#d52a0b'
  },
  "startTime": {
    type: String,
    default: Date.now()
  },
  "customerId": {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  "technicianId": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "serviceAdvisorId": {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  "vehicleId": {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  "vehicleLocation": {
    type: String,
    required: true,
    default: 'Prep Area'
  },
  "milesIn": {
    type: String,
    default: null
  },
  "milesOut": {
    type: String,
    default: null
  },
  "keytag": {
    type: String,
    default: null
  },
  "completedDate": {
    type: String,
    default: null
  },
  "sales": {
    type: Number,
    default: null
  },
  "discountTotal": {
    type: Number,
    default: null
  },
  "feeTotal": {
    type: Number,
    default: null
  },
  "taxes": {
    type: Number,
    default: null
  },
  "amountPaid": {
    type: Number,
    default: 0
  },
  "totalSale": {
    type: Number,
    default: null
  },
  "name": {
    type: String,
    required: true,
  },
  "authorized": {
    type: Boolean,
    default: false
  },
  "authorizedDate": {
    type: Date,
    default: null
  },
  "notes": [
    {
      type: String,
      default: null
    }
  ],
  "customerConcerns": [
    {
      type: String,
      default: null
    }
  ],
  "cancelled": {
    type: Boolean,
    default: false
  },
  "deletedDate": {
    type: Date,
    default: null
  }
}, { timestamps: true })

const Repair = models.Repair || model('Repair', repairSchema)
export default Repair