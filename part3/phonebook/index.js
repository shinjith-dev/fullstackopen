const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const PORT = process.env.PORT

app.use(express.static('build'))

app.use(express.json())

app.use(function (req, res, next) {
  req.start = new Date(Date.now())
  next()
})

app.use(cors())

app.use(express.static('build'))

morgan.token('jsonbody', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.jsonbody(req, res),
    ].join(' ')
  })
)

var people = []

app.get('/info', (req, res) => {
  res.set('content-type', 'text/html')
  res.send(
    `<p>Phonebook has info of ${people.length} people</p><p>${req.start}</p>`
  )
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((val) => {
      res.json(val)
      people = val
    })
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => res.json(person))
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name is missing',
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number is missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((addedPesron) => res.json(addedPesron))
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError')
    return response.status(400).send({ error: error.message })

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`sever started on port ${PORT}`))

module.exports = app
