import { Schema, models, model } from 'mongoose'
import Shop from './locations'
import Customer from './customers'

const appointmentSchema = new Schema({
  "locationId": {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  },
  "customerId": {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  "startTime": {
    type: Date,
    required: true
  },
  "endTime": {
    type: Date,
    required: true
  },
  "description": {
    type: String,
    required: true
  },
  "arrived": {
    type: Boolean,
    required: true,
    default: false
  },
  "deletedDate": {
    type: String,
    default: null
  },
  "leadSource": {
    type: String,
    default: null
  },
  "rideOption": {
    type: String,
    required: true,
    default: 'Drop-off Vehicle'
  },
  "dropoffTime": {
    type: Date,
    default: null
  },
  "pickupTime": {
    type: Date,
    default: null
  },
}, { timestamps: true })

const Appointment = models.Appointment || model('Appointment', appointmentSchema)
export default Appointment