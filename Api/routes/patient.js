const express = require('express');
const router = express.Router();
const PatientModel = require('../models/PatientModel');
const UserModel = require('../models/UserModel');
PatientModel.belongsTo(UserModel,{
    foreignKey:'createdby',
    onDelete:'cascade'
})
router.get('/getAll', (req, res) => {
    PatientModel.findAll({
        include:UserModel
    })
        .then(response => res.send(response))
        .catch(err => res.sendStatus(500))
})

router.post('/Add', (req, res) => {
    const model = {
        name,
        address,
        mobilenumber,
        createdby,
        email,
        dateregistered
    } = req.body;
    PatientModel.findOne({
        where: {
            'email': email
        }
    }).then(response => {
        if (response !== null) {
            res.sendStatus(304)
        } else {
            PatientModel.create({
                name,
                address,
                mobilenumber,
                createdby,
                email,
                dateregistered
            }).then(response => res.sendStatus(200)).catch(err => {

                res.sendStatus(500)
            })
        }
    })

})

router.get('/Search/id', (req, res) => {
    PatientModel.findAll({
        where: {
            name: req.params.id
        }
    }).then(success => {
        if (success === null)
            res.send('no record found');
        else
            res.send(success)
    }).catch(err => {
        res.sendStatus(500)
    })
})

router.delete('/Delete/:id',(req,res)=>{
    PatientModel.destroy({
        where:{id:req.params.id}
    }).then(response=>res.sendStatus(200))
    .catch(err=>res.sendStatus(304))
})

module.exports = router;