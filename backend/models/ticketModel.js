const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },

    category : {
        type : String,
        required : [true, 'Please select a category'],
        enum : ['education', 'discipline', 'food', 'other'],
    },

    description : {
        type : String,
        required : [true, 'Please enter a description of the problem'],
    },

    status : {
        type : String,
        required : true,
        enum : ['new', 'under process', 'closed'],
        default : 'new',
    },


},
  {
    timestamps : true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)

