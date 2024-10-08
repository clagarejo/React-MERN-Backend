const path = require('path')
const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

// Crear el servidor de express
const app = express()

// Base de datos
dbConnection()

//CORS
app.use(cors())

// Directorio publico
app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json())

//rutas
// TODO auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'))

// TODO CRUD: Eventos
app.use('/api/events', require('./routes/events'))

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// Escuchar las peticiones
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en ${process.env.PORT}`)
})