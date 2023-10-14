import express from 'express'
import { URLController } from './controller/URLController'
import { MongoConnection } from './database/MongoConnection'
import 'dotenv/config'

import swaggerUI from 'swagger-ui-express'
import yaml from 'js-yaml'
import fs from 'fs'

// Get document, or throw exception on error

  const doc = yaml.load(fs.readFileSync('./swagger.yml', 'utf8'));

const app = express()

app.use(express.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(doc || {}))

const database = new MongoConnection()
database.connect()

const urlController = new URLController()

app.post('/shorten', urlController.shortenURL)
app.get('/:hash', urlController.redirectURL)
app.get('/', urlController.getAllURLs)
app.get('/url/:id', urlController.getShortenedURLById);
app.get('/urls/:date', urlController.getURLsByDate);

app.listen(3000, () => {
  console.log(`server is running`)
})
