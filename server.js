'use strict'

var app = require('./app.js'),
    server = app.listen(app.get('port'), () =>{
      console.log(`Corriendo servidor en localhost:${app.get('port')}`)
    })
