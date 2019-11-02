const express = require('express');
const router = express.Router();
const userModel = require('../models/UserModel');
const roleModel = require('../models/RoleModel');
const staffTyepeModel = require('../models/StaffTypeModel');
const departmentModel = require('../models/DeparmentModel');
const specialtyModel = require('../models/SpecialtyModel');
userModel.belongsTo(roleModel, {
	foreignKey: 'roleid',
	onDelete:'cascade'
});
userModel.belongsTo(staffTyepeModel, {
	foreignKey: 'stafftypeid',
	onDelete:'cascade'
});
userModel.belongsTo(departmentModel, {
	foreignKey: 'departmentid',
	onDelete:'cascade'
});
userModel.belongsTo(specialtyModel, {
	foreignKey: 'specialtyid',
	onDelete:'cascade'
});
router.get('/getAll', (req, res) => {
	userModel
		.findAll({
			include: [ roleModel, specialtyModel, departmentModel, staffTyepeModel ]
		})
		.then((response) => res.send(response))
		.catch((err) => console.log(err));
});

router.post('/Add', (req, res) => {
	const {
		username,
		mobilenumber,
		email,
		address,
		password,
		specialtyid,
		stafftypeid,
		departmentid,
		name,
		datecreated,
		roleid
	} = req.body;

	userModel
		.findOne({
			where: {
				username: username
			}
		})
		.then((response) => {
			if (response !== null) res.sendStatus(304);
			else {
				userModel
					.create({
						username,
						mobilenumber,
						email,
						address,
						password,
						specialtyid,
						stafftypeid,
						departmentid,
						name,
						datecreated,
						roleid
					})
					.then((response) => {
						console.log(response);
						res.sendStatus(200);
					})
					.catch((err) => {
						console.log(err);
						res.sendStatus(500);
					});
			}
		});
});

router.post('/login', (req, res) => {
	userModel
		.findOne({
			where: {
				username: req.body.username,
				password: req.body.password
			},
			include: [
				{
					model: roleModel
				}
			]
		})
		.then((response) => {
			if (response === null)
				res.send({
					err: 'Username or password incorrect!'
				});
			else res.send(response);
		})
		.catch((err) => {
			res.sendStatus(500);
		});
});

router.put('/resetpassword/:id', (req, res) => {
	userModel
		.findOne({
			where: {
				username: req.params.id
			}
		})
		.then((response) => {
			if (response != null) {
				userModel
					.update(
						{
							password: 'user1'
						},
						{
							where: {
								username: req.params.id
							}
						}
					)
					.then((success) => res.sendStatus(200))
					.catch((err) => res.sendStatus(304));
			} else {
				res.sendStatus(304);
			}
		});
});

router.get('/checkuserexists/:id', (req, res) => {
	userModel
		.findOne({
			where: {
				username: req.params.id
			}
		})
		.then((response) => {
			if (response === null) res.send(0);
			else res.send(1);
		});
});

router.delete('/delete/:id', (req, res) => {
	userModel
		.destroy({
			where: { id: req.params.id }
		})
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			res.sendStatus(304);
		});
});

router.put('/Update/:id', (req, res) => {
	const { name, email, address, mobilenumber, stafftypeid, roleid, departmentid, specialtyid } = req.body;
	console.log(req.body);
	userModel
		.update(
			{
				name,
				email,
				address,
				mobilenumber,
				stafftypeid,
				roleid,
				departmentid,
				specialtyid
			},
			{
				where: {
					id: req.params.id
				}
			}
		)
		.then((success) => {
			res.sendStatus(200);
		})
		.catch((err) => res.sendStatus(304));
});

module.exports = router;
