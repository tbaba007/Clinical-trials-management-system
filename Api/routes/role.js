const express = require('express');
const router = express.Router();
const RoleModel = require('../models/RoleModel');

router.get('/getAll', (req, res) => {
	RoleModel.findAll().then((response) => res.send(response)).catch((err) => res.sendStatus(500));
});

router.post('/Add', (req, res) => {
	let { name, createdby } = req.body;
	RoleModel.create(name, createdby).then((response) => res.sendStatus(200)).catch((err) => {
		res.sendStatus(500);
	});
});

module.exports = router;
