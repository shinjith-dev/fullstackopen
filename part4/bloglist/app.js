const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = 'mongodb+srv://whitewolf:fu17dpU90QPSdflN@cluster1.qhhmprl.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

app.use(cors());
app.use(express.json());

app.use('/api/blogs',blogsRouter)

module.exports = app