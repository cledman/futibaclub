const express = require('express')
const app = express.Router()

const init = connection =>{
  app.get('/', async(req,res) =>{
    // a posição 0 vira rows e a 1 vira fields, do array que vem do banco
    const [rows,fields] = await connection.execute('select * from users')
    console.log(rows)

    res.render('home')
  })

  app.get('/new-account', (req,res) =>{
    res.render('new-account')
  })

  app.post('/new-account',(req,res) =>{
    console.log(req.body)
    res.render('new-account')
  })
  return app

}

module.exports = init //aqui ele exporta só a função