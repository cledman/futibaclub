const express = require('express')//aqui é um módulo
const app = express()// aqui está instanciando esse módulo. É como se fosse um app desse módulo
const mysql = require('mysql2/promise')
const bodyParser= require('body-parser')

const account = require('./account')

app.use(express.static('public'))//aqui é um middlewaare, onde tudo que for estático, apontará para public
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

const init = async() =>{
    const connection =await mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'',
        database:'futiba-club'
    })

  app.use(account(connection) )

  app.listen(3000, err => {   
    console.log('Futiba Club server is running')
  })
}

init()


