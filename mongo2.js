const mongoose = require('mongoose')
if (process.argv.length < 3) {
    console.log('Te faltan parametros')
    console.log('node mongo2.js <password>')
    process.exit(1)

}

const password = process.argv[2]


const url  = `mongodb+srv://fidel:${password}@cluster0.gupnpme.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const notSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', notSchema)



Note.find({}).then(result => {
    result.forEach(x => {
        console.log(x)
    })
    mongoose.connection.close()
})