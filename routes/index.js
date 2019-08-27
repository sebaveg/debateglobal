'use strict'

var express = require('express'),
    router = express.Router()

function pug(req,res,next){
  let locals = {
    pageTittle : 'Pug'
  }
  res.render('index', locals)
}

function error404(req,res,next){
  let error = new Error(),
      locals = {
        title : 'Error 404',
        description : 'Recurso no encontrado',
        error : error
      }

  error.status = 404
  res.render('error', locals)
  next()
}

router.get('/redireccion', (req,res) => {
  res.redirect(301, 'http://sebastiancardoso.com')
})
router.get('/json', (req,res) => {
  res.json({
    name: "Sebastian",
    age: 25,
    user: "sebaveg"
  })
})

// Para que render?
router.get('/render', (req,res) => {
  res.render(`${__dirname}index.html`)
})
router.get('/pug', pug)

router.get('/', (req,res) => {
  res.render('index')
})

router.get('/search', (req,res) => {
  res.end(`<h2>Estas en el seach, los resultados de la busqueda son: <mark>${req.query.s}</mark>`)
}
router.get('/estadisticas', (req,res) => {
  res.render('estadisticas')
})
router.get('/debates', (req,res) => {
  res.render('debates')
})
router.get('/debate', (req,res) => {
  res.render('debate')
})
router.use(error404)

module.exports = router
