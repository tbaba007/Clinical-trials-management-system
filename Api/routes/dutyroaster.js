const express = require('express');
const router = express.Router();
const dutyroasterModel = require('../models/DutyRoasterModel');

router.get('/getAll', (req, res) => {
    dutyroasterModel.findAll()
        .then(response => res.send(response))
        .catch(err => res.sendStatus(500))
})

router.post('/Add', (req, res) => {
    let {
        staffid,
        shift
    } = req.body;
    dutyroasterModel.create(
            staffid,
            shift
        ).then(response => res.sendStatus(200))
        .catch(err => {
            res.sendStatus(500)
        })
})

router.put('/Update/:id', (req, res) => {
    let {
        shift
    } = req.body;
    dutyroasterModel.update({
            shift
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
    dutyroasterModel.destroy({

            where: {
                id: req.params.id
            }

        }).then(response => res.sendStatus(200))
        .catch(err => {
            res.sendStatus(304)
        })
})

module.exports = router;