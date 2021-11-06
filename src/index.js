const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const config = require('./config')
const routes = require('./routes')

const app = express()

const PORT = config.port || 3000
const address = `0.0.0.0:${PORT}`
// HTTP request logger middleware
app.use(morgan('dev'))
// enable CORS
// app.use(cors())
// add routing for /api path
app.use('/api', routes)
// add live routing
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'I am live 😉'
  })
})

app.listen(PORT, () => {
  console.log(`alive server on ${address}`)
})
