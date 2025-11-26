const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)
console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connectingto MongoDB', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

noteSchema.set('toJSON',{ 
    transform: (document, obj) => {
        obj.id = document._id.toString()
        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)