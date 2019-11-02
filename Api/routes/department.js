const express = require('express');
const router = express.Router();
const departmentModel = require('../models/DeparmentModel');
const usermodel = require('../models/UserModel');
departmentModel.belongsTo(usermodel,{
    foreignKey:'createdby',
    onDelete:'CASCADE'
})
router.get('/getAll', (req, res) => {
    departmentModel.findAll({
        include:usermodel
    })
        .then(response => res.send(response))
        .catch(err => res.sendStatus(500))
})

router.post('/Add', (req, res) => {
    const {
        name,
        createdby
    } = req.body;
    departmentModel.findOne({
        where:{
            name:name
        }
    }).then(response=>{
        if(response===null)
        {
            departmentModel.create({
                name,
                createdby}
            ).then(response => res.sendStatus(200))
            .catch(err => {
                res.sendStatus(500)
            })
        }
        else
        {
            res.sendStatus(304)
        }
    })
   
})

router.put('/Update/:id', (req, res) => {
    let {
        name
    } = req.body;
    departmentModel.update({
            name
        }, {
            where: {
                id: req.params.id
            }
        }).then(response => res.sendStatus(200))
        .catch(err => {
            res.sendStatus(304)
        })
})

router.delete('/delete/:id', (req, res) => {
    departmentModel.destroy({

            where: {
                id: req.params.id
            },
            cascade:true

        }).then(response => res.sendStatus(200))
        .catch(err => {
            res.sendStatus(304)
        })
})

module.exports = router;