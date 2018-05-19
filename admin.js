const express = require('express')
const app = express.Router()


const init = connection =>{
    app.use((req,res,next) =>{
        if(!req.session.user || req.session.user.role==='user'){
            res.redirect('/')
        }else{
            next()
        }
    })
    app.get('/', (req,res) => {
        res.send('Olá admin')
    })
    app.get('/games', async(req,res) => {
        const[rows, fields] = await connection.execute('select * from games')
        res.render('admin/games',{
            games:rows
        })
    })    
     return app    
}

module.exports = init