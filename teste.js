const express = require('express')
const app = express('app')

app.get('/', (req,res) =>{
    res.send('olá')
})

app.listen(3000, err=>{
    console.log('runningno')
})