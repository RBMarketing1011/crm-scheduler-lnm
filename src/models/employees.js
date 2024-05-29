import mongoose from 'mongoose'

const { Schema, model, models } = mongoose

const employeeSchema = new Schema({
  "email": {
    type: String,
    required: [ true, 'Email is required.' ]
  },
  "firstName": {
    type: String,
    required: [ true, 'First name is required.' ]
  },
  "lastName": {
    type: String,
    required: [ true, 'Last name is required.' ]
  },
  "address": {
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
  "employeeRole": {
    "code": {
      type: Number,
      required: true,
      default: 0
    },
    "name": {
      type: String,
    }
  },
  "certificationNumber": {
    type: String,
  }
}, { timestamps: true })

const Employee = models.Employee || model('Employee', employeeSchema)
export default Employee