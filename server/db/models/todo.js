const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TODOSchema = new Schema({
  heading: {type: String, unique: false},
  description: {type: String, unique: false},
  iscompleted: {type: String, unique: false},
  comment: {type: String, unique: false}
})

// Create reference to User & export
const TODO = mongoose.model('TODO', TODOSchema)
module.exports = TODO
