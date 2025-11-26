require('dotenv').config()
const express = require("express")
const app = express()
app.use(express.json());
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

const Note = require('./models/note')

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    console.log('----------------------');
    next()
}

app.use(requestLogger)

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes =>{
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note =>{ 
            if(note){
                response.json(note)
            }
            else{
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result=>{
            response.status(204).end()
        })
        .catch(error=> next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
    const note = {
        content: body.content,
        important: body.important,
    }
    Note.findByIdAndUpdate(request.params.id, note, {new:true})
        .then(note2=>{
            response.json(note2)
        })
        .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
    const body = request.body
    if(body.content)
    {
        const note = new Note ({
            content: body.content,
            important:body.important
        })
        note.save().then(x => {
            response.json(x)
        })
    }
    else 
    {
        response.status(400).json({error: 'content is missing'})
    }
})

const badPath = (request, response, next) => {
    response.status(404).send({error: 'Ruta desconocida'})
}

app.use(badPath)

const errorHandler = (error, request, response, next) => {
    console.log('Error: ', error.message);
    if (error.name === "CastError")
    {
        return response.status(400).send({error: 'id not found'})
    }
    next(error) 
}
app.use(errorHandler)

//Para que escoja el puerto
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

