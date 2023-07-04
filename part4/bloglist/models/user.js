const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User
