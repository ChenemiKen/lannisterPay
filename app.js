require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use(router)


module.exports = app