const express = require('express')
const app = express.Router()

const init = connection =>{
    app.use((req,res,next) =>{
        if(!req.session.user){
            res.redirect('/')
        }else{
            next()
        }
    })    
    app.get('/', async(req,res) => {
        const [ groups, fields ] = await connection.execute('select * from groups')
        res.render('groups', {
            groups
        })
    })
    return app
}

module.exports = init