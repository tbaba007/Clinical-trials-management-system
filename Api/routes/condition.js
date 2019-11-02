const express = require('express');
const router = express.Router();
const conditionModel = require('../models/ConditionModel');
const medicalHistoryModel= require('../models/MedicalHistoryModel');
const patientModel = require('../models/PatientModel');
router.get('/getAll', (req, res) => {
	conditionModel.findAll(
		{
			order:['name']
		}
	).then((response) => res.send(response)).catch((err) => {
		console.log(err);
		res.sendStatus(500)
	})
});
router.delete('/delete/:id', (req, res) => {
	conditionModel
		.destroy({
			where: {
				id: req.params.id
			}
		})
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			res.sendStatus(304);
		});
});

router.put('/update/:id', (req, res) => {
	const { name } = req.body;
	conditionModel
		.update(
			{
				name,
				downcase_name: req.body.name
			},
			{
				where: {
					id: req.params.id
				}
			}
		)
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((err) => res.sendStatus(304));
});

router.post('/Add', (req, res) => {
	conditionModel
		.findOne({
			where: {
				name: req.body.name
			}
		})
		.then((response) => {
			if (response === null) {
				conditionModel
					.create({
						name: req.body.name,
						downcase_name: req.body.name
					})
					.then((success) => {
						res.sendStatus(200);
					})
					.catch((err) => {
						res.sendStatus(500);
					});
			} else res.sendStatus(304);
		});
});

router.get('/search/:id', (req, res) => {
	conditionModel
		.findAll({
			where: {
				     name: req.params.id 
			}
		})
		.then((success) => {
			res.send(success);
		})
		.catch(err=>{
            console.log(err)
            res.sendStatus(500);
  
        })
});
module.exports = router;
