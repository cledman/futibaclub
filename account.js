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

  app.post('/new-account', async(req,res) =>{
   const [rows,fields] = await connection.execute('select * from users where email = ?',[req.body.email])//prepared statment é o lance dessa interrogação aí
    
   console.log(rows)

    if(rows.length===0) {
      //inserir
      console.log('inserir')
      res.render('new-account')      
    }else{
      console.log('deu erro')      
      res.render('new-account', {
        error: 'Usuário já existente'
      })
    }   
  })
  return app

}

module.exports = init //aqui ele exporta só a função