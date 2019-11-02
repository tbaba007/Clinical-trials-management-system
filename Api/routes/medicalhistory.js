const express = require('express');
const router = express.Router();
const MedicalHistoryModel = require('../models/MedicalHistoryModel');
const conditionModel = require('../models/ConditionModel');
const patientModel = require('../models/PatientModel');
const userModel = require('../models/UserModel');
const testResultModel=require('../models/TestResultModel');

const op=require('sequelize').Op;
MedicalHistoryModel.belongsTo(conditionModel, {
	foreignKey: 'conditionid',
	onDelete:'cascade'
});
MedicalHistoryModel.belongsTo(patientModel, {
	foreignKey: 'patientid',
	onDelete:'cascade'
});
MedicalHistoryModel.belongsTo(userModel, {
	foreignKey: 'doctorvisited',
	onDelete:'cascade'
});
MedicalHistoryModel.belongsTo(testResultModel, {
	foreignKey: 'testresultid',
	onDelete:'cascade'
});



router.get('/getAll', (req, res) => {
	MedicalHistoryModel.findAll({
		include: [ patientModel, conditionModel, userModel,testResultModel ]
	})
		.then((response) => res.send(response))
		.catch((err) => res.sendStatus(500));
});

router.post('/Add', (req, res) => {
	let {
		patientid,
		datevisited,
		complaints,
		istestrequired,
		testdetails,
		testresult,
		actiontaken,
		doctorvisited,
		conditionid
	} = req.body;
	MedicalHistoryModel.create({
		patientid,
		datevisited,
		complaints,
		istestrequired,
		testdetails,
		testresult,
		actiontaken,
		doctorvisited,
		conditionid
	})
		.then((response) => res.sendStatus(200))
		.catch((err) => {
			res.sendStatus(500);
		});
});

router.post('/Schedule', (req, res) => {
	const { patientid, datevisited, weight, bp, attendedto,doctorvisited } = req.body;
	MedicalHistoryModel.create({
		patientid,
		datevisited,
		weight,
		bp,
		attendedto,
		doctorvisited,
		istesttaken:'FALSE'
	})
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			res.sendStatus(500);
		});
});

router.get('/getMedicalHistoryByDate/:id', (req, res) => {
	var date =
		new Date().getFullYear() + '-' + (parseInt(new Date().getMonth().toString()) + 1) + '-' + new Date().getDate();

	MedicalHistoryModel.findAll({
		include: [ patientModel,testResultModel ],
		where: {
			datevisited: date,
			attendedto: 'FALSE'
		}
	}).then((response) => {
		if (response === null) res.send({ Response: 'No Complaints so far today' });
		else res.send(response);
	});
});

router.put('/update/:id', (req, res) => {
	const { complaints, actiontaken, istestrequired, prescription, testdetails, doctorvisited, attendedto } = req.body;
	MedicalHistoryModel.update(
		{
			complaints,
			istestrequired,
			prescription,
			testdetails,
			//doctorvisited,
			attendedto,
			actiontaken
		},
		{
			where: { id: req.params.id }
		}
	)
		.then((success) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			res.sendStatus(304);
		});
});

router.get('/getPendingTest/:id', (req, res) => {
	var date =
		new Date().getFullYear() + '-' + (parseInt(new Date().getMonth().toString()) + 1) + '-' + new Date().getDate();

	MedicalHistoryModel.findAll({
		include: [ patientModel ],
		where: {
			datevisited: date,
			istestrequired: 'TRUE',
			istesttaken:'FALSE'
		}
	}).then((response) => {
		if (response === null) res.send({ Response: 'No Complaints so far today' });
		else res.send(response);
	});
});

router.put('/doctorupdate/:id',(req,res)=>{
	MedicalHistoryModel.update(
		{
			prescription:req.body.prescription,
			actiontaken:req.body.actiontaken,
			conditionid:req.body.conditionid,
			attendedto:'TRUE'
		},
		{
			where:{
				id:req.params.id
			}
		}
	).then(success=>{
		res.sendStatus(200)
	}).catch(err=>{
		res.sendStatus(304)
	})
})

router.get('/getbyid/:id',(req,res)=>{
	MedicalHistoryModel.findAll(
		{
			include:[
				patientModel,
				conditionModel,
				userModel,
				testResultModel
			],
			where:{
				patientid:req.params.id
			}
		}
	).then(success=>{
		if(success===null)
		res.status(401).json("No Medical History Found")
		else
		res.send(success)
	}).catch(err=>{
		res.sendStatus(500);
	})
})

router.delete('/deletecomplaint/:id',(req,res)=>{
	MedicalHistoryModel.destroy({
		where:{
			id:req.params.id
		}
	}).then(success=>{
		res.sendStatus(200)
	}).catch(err=>res.sendStatus(304))
})

router.post('/analysis',(req,res)=>{
	MedicalHistoryModel.findAll({
		where:{
			datevisited:{
				[op.between]:[req.body.fromdate,req.body.enddate]
			}
		},
		include:[
			conditionModel,
			patientModel,
			userModel,
			testResultModel
		]
	}).then(response=>{
		if(response===null)
		return res.send("No Record Found").json("No Record Found")
		else
		res.send(response)
	}).catch(err=>{
		console.log(err);
		res.sendStatus(500)
	})
})

router.post('/analysis/:id',(req,res)=>{
	MedicalHistoryModel.findAll({
		where:{
			conditionid:req.params.id,
			datevisited:{
				[op.between]:[req.body.fromdate,req.body.enddate]
			}
		},
		include:[
			conditionModel,
			patientModel,
			userModel,
			testResultModel
		]
	}).then(response=>{
		if(response===null)
		return res.send("No Record Found").json("No Record Found")
		else
		res.send(response)
	}).catch(err=>{
		console.log(err);
		res.sendStatus(500)
	})
})

router.delete('/deleteinfo/:id',(req,res)=>{
	MedicalHistoryModel.destroy({
		where:{
			id:req.params.id
		}
	}).then(response=>{
		res.sendStatus(200)
	}).then(err=>{
		res.sendStatus(304)
	})
})
module.exports = router;
