import express from 'express'
import { URLController } from './controller/URLController'
import { MongoConnection } from './database/MongoConnection'
import 'dotenv/config'
import swaggerUI from 'swagger-ui-express'
import yaml from 'js-yaml'
import fs from 'fs'

const app = express()
const doc = yaml.load(fs.readFileSync('./swagger.yml', 'utf8'))
const database = new MongoConnection()
database.connect()
const urlController = new URLController()

app.use(express.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(doc || {}))

app.post('/shorten', urlController.shortenURL)
app.get('/:hash', urlController.redirectURL)
app.get('/', urlController.getAllURLs)
app.get('/url/:id', urlController.getShortenedURLById)
app.get('/urls/:date', urlController.getURLsByDate)
app.delete('/delete/:id', urlController.deleteURL)

app.listen(3000, () => {
  console.log(`server is running`)
})
