const mongoose = require('mongoose')
if (process.argv.length < 3) {
    console.log('Te faltan parametros')
    console.log('node mongo1.js <password> [contenido] [importante]');
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

const note = new Note({
    content: process.argv[3],
    important: process.argv[4]
})

note.save().then(result => {
    console.log('Nota guardada')
    mongoose.connection.close()
})
