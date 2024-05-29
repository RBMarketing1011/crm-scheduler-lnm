import { Schema, models, model } from 'mongoose'

const servicesSchema = new Schema({
  name: {
    type: String,
    required: [ true, 'Service Must Have A Name' ],
    unique: [ true, 'Service Already Created' ],
  },
  desc: {
    type: String,
    required: [ true, 'Service Must Have A Desc' ]
  },
  icon: {
    type: String,
    required: [ true, 'Please Include An Icon' ]
  },
  moreInfo: {
    question: {
      type: String,
    },
    answers: [
      {
        type: String,
        unique: [ true, 'Answer Already Exists' ]
      }
    ]
  }
})

const Services = models.Services || model('Services', servicesSchema)
export default Services