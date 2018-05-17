const express = require('express')
const app = express.Router()

const init = connection =>{
  app.get('/', async(req,res) =>{
    // a posição 0 vira rows e a 1 vira fields, do array que vem do banco
  //  const [rows,fields] = await connection.execute('select * from users')
//    console.log(rows)

    res.render('home')
  })

  //seguir o vídeo em 01:26
  app.get('/logout', (req,res) =>{
    req.session.destroy( err =>{
      res.redirect('/')
    })
  })

  app.get('/login', (req,res) =>{
    res.render('login', {error:false})
  })


  app.get('/new-account', (req,res) =>{
    res.render('new-account', {error:false})
  })

  app.post('/login', async(req,res) => {
    const [rows,fields] = await connection.execute('select * from users where email = ?',[req.body.email])//prepared statment é o lance dessa interrogação aí
    if(rows.length===0) {
      res.render('login',{error: 'Usuário e/ou senha inválidos.'})
    }else{
      if(rows[0].passwd===req.body.passwd){
        const userDb = rows[0]
        const user = {
          id: userDb.id,
          name: userDb.name,
          role: userDb.role
        }
        req.session.user = user
        res.redirect('/')
      }else{
        res.render('login', {error: 'Usuário e/ou senha inválidos'})
      }
    }
  })

  app.post('/new-account', async(req,res) =>{
   const [rows,fields] = await connection.execute('select * from users where email = ?',[req.body.email])//prepared statment é o lance dessa interrogação aí
    
   //console.log(rows)

    if(rows.length===0) {
      //inserir
      const {name, email, passwd} = req.body //isso é destruction assignment. É do ES6. ele extrai de dentro do BODY as variáveis informadas, pois senão teria que ser req.body.name, req... etc
      const [inserted,fields]= await connection.execute('insert into users (name, email, passwd,role) values(?,?,?,?)', [
        name,
        email,
        passwd,
        'user'//pois a regra é padrão, então pode passar aqui mesmo. 
      ])

      //console.log(inserted.insertId)//esse insertId ele pega do retorno do ResultSetHeader (console.log) que é o último id inserido quando incluímos um usuário.
      
      const user = {
        id: inserted.insertId,// esse aqui é o que eu falei acima 
        name: name,
        role: 'user'
      }
      req.session.user = user

      res.redirect('/')      
    }else{
         
      res.render('new-account', {
        error: 'Usuário já existente'
      })
    }   
  })
  return app

}

module.exports = init //aqui ele exporta só a função