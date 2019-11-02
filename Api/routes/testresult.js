const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const testResultModel = require('../models/TestResultModel');
const userModel = require('../models/UserModel');
const patientModel = require('../models/PatientModel');
const MedicalHistory = require('../models/MedicalHistoryModel');
testResultModel.belongsTo(userModel, {
	foreignKey: 'testrecommendedby',
	onDelete:'cascade'
});
testResultModel.belongsTo(userModel, {
	foreignKey: 'testdobneby',
	onDelete:'cascade'
});
testResultModel.belongsTo(userModel, {
	foreignKey: 'uploadedby',
	onDelete:'cascade'
});
testResultModel.belongsTo(patientModel, {
	foreignKey: 'patientid',
	onDelete:'cascade'
});
router.get('/getAll', (req, res) => {
	testResultModel
		.findAll({
			include: [ patientModel, userModel ]
		})
		.then((response) => res.send(response))
		.catch((err) => res.sendStatus(500));
});

router.post('/Add', (req, res) => {
	let {
		patientid,
		testrecommendedby,
		testdetails,
		testdobneby,
		uploadedby,
		datedone,
		testupload
	} = req.body;

    //const file = req.files.testupload;
    console.log(req.body);
   // let files=testupload.file;
	//files.mv(`${__dirname}/public/uploads/${files.name}`);
	//testupload = `${__dirname}/public/uploads/${files.name}`;
	testResultModel
		.create({
			patientid,
			testrecommendedby,
			testdetails,
			uploadedby,
			testdobneby,
			datedone,
			testupload
			
		})
		.then((response) => {
			MedicalHistory.update(
				{
					istesttaken: 'TRUE',
					testresultid:response.get('id')
				},
				{
					where: {
						id: req.body.medicalhistoryid
					}
				}
			);
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(500);
		});
});

module.exports = router;
