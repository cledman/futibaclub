//parei o vídeo em 44:00:00 em 19/07, quando ele faz a alteração pra puxar o grupo. Erro corrigido(group.ejs onde pega o id do grupo), mas diferente do vídeo.
const express = require('express')//aqui é um módulo
const app = express()// aqui está instanciando esse módulo. É como se fosse um app desse módulo
const mysql = require('mysql2/promise')
const bodyParser= require('body-parser')
const session = require('express-session')
const account = require('./account')
const admin = require('./admin')
const groups = require('./groups')

app.use(express.static('public'))//aqui é um middlewaare, onde tudo que for estático, apontará para public
app.use(bodyParser.urlencoded({extended:true}))


/* deprecated
app.use(session({
  secret:'fullstack-academy',
  resave:true,
  saveUnitialized:true
}))
*/

app.use(session({
  secret: 'fullstack-academy',
  name: 'cookie_name',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));




app.set('view engine', 'ejs')

const init = async() =>{
    const connection =await mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'',
        database:'futibaclube'
    })

   app.use((req,res,next) =>{
     if(req.session.user){
       res.locals.user=req.session.user
     }else{
       res.locals.user=false;
     }
     next()
   })

  app.use(account(connection) )
  app.use('/admin', admin(connection))
  app.use('/groups', groups(connection))  

  app.listen(3000, err => {   
    console.log('Futiba Club server is running')
  })
}

init()


