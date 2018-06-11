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
        const [ groups, fields ] = await connection.execute('select groups.*,groups_users.role from groups left join groups_users on groups.id = groups_users.group_id and groups_users.user_id = ?',[
            req.session.user.id
        ])
        res.render('groups', {
            groups
        })
    })

    app.get('/:id', async(req, res) =>{
        const [pendings] = await connection.execute('select groups_users.*, users.name from  groups_users inner join users on groups_users.user_id=users.id and groups_users.group_id=? and groups_users.role like "pending"', [
            req.params.id
        ])
        res.render('group', {
            pendings
        })
    })

    app.get('/:id/join', async(req, res) =>{
        const [rows, fields] = await connection.execute('select * from groups_users where user_id = ? and group_id = ?', [
            req.session.user.id,
            req.params.id //que é o id que vem da url do app.get ali de cima.
        ])
        if(rows.lenght>0){
            res.redirect('/groups')
        }else{
            await connection.execute('insert into groups_users (group_id, user_id, role) values (?,?,?)',[
                req.params.id,
                req.session.user.id,
                'pending'
            ])  
            res.redirect('/groups')          
        }
    })

    app.post('/', async(req, res) =>{
       const [insertedId, inseterdFields] = await connection.execute('insert into groups (name) values (?)',[
            req.body.name
        ])
        await connection.execute('insert into groups_users (group_id, user_id, role) values (?,?,?)',[
            insertedId.insertId,
            req.session.user.id,
            'owner'
        ])
        res.redirect('/groups')
    })
    return app
}

module.exports = init