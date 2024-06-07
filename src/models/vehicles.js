import { Schema, models, model } from 'mongoose'

const vehicleSchema = new Schema({
  "year": {
    type: Number,
    required: true,
    min: 1900,
    max: 3000
  },
  "make": {
    type: String,
    required: true
  },
  "model": {
    type: String,
    required: true
  },
  "subModel": {
    type: String,
    default: null
  },
  "engine": {
    type: String,
    default: null
  },
  "color": {
    type: String,
    default: null
  },
  "licensePlate": {
    type: String,
    default: null
  },
  "state": {
    type: String,
    default: null
  },
  "vin": {
    type: String,
    default: null
  },
  "driveType": {
    type: String,
    default: null
  },
  "transmission": {
    type: String,
    default: null
  },
  "bodyType": {
    type: String,
    default: null
  },
  "notes": [
    {
      type: String,
      default: null
    }
  ],
  "deletedDate": {
    type: Date,
    default: null
  }
}, { timestamps: true })

const Vehicle = models.Vehicle || model('Vehicle', vehicleSchema)
export default Vehicle