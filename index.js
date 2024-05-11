import express from 'express'
import cors from 'cors'
require('dotenv').config()
import route from './src/routes'
require('./src/database/connection')

const app = express()
const PORT = process.env.PORT || 8081

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route(app)

app.listen(PORT, () => {
    console.log(`App is listen on port ${PORT}`)
})
