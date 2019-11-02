const express = require('express');
const router = express.Router();
const SpecialtyModel = require('../models/SpecialtyModel');

router.get('/getAll', (req, res) => {
	SpecialtyModel.findAll().then((response) => res.send(response)).catch((err) => res.sendStatus(500));
});

router.post('/Add', (req, res) => {
	let { name, createdby } = req.body;
	SpecialtyModel.create(name, createdby).then((response) => res.sendStatus(200)).catch((err) => {
		res.sendStatus(500);
	});
});

module.exports = router;
