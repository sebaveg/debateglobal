'use strict'

var express = require('express'),
    bodyParser = require('body-parser'),  // Lee los datos de la peticion como los del formulario
    pug = require('pug'),
    routes = require('./routes/index'),
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`

const app = express()
const port = process.env.PORT || 8080 //Se lo lllama en la funcion listen

app
  .set('views', viewDir)
  .set('view engine', 'pug')
  .set('port', port)
  .use(publicDir)  // Aqui se guarda los archivos estaticos como css e imagenes
  .use('/', routes)

  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())  // para peticions application/json

app.post('/signup', (req,res) => {
  console.log('Usuario: ' + req.body.username)
  console.log('Contraseña: ' + req.body.pass)
  console.log('Correo: ' + req.body.email)
  res.end('<h1>Recibimos tus datos</h1>')
})

module.exports = app

console.log(process.uptime()) //Tiempo que tarda en ejecutar
