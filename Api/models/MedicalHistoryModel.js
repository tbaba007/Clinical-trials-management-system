const DataType=require('sequelize');
const db = require('../config/database');

const MedicalHistoryModel= db.define('medicalhistory',{
    patientid:{
        type:DataType.INTEGER
    },
    datevisited:{
        type:DataType.STRING
    },
    complaints:{
        type:DataType.STRING
    },
    istestrequired:{
        type:DataType.BOOLEAN
    },
    testdetails:{
        type:DataType.STRING
    },
    actiontaken:{
        type:DataType.STRING
    },
    doctorvisited:{
        type:DataType.INTEGER
    },
    conditionid:{
        type:DataType.INTEGER
    },
    bp:{
        type:DataType.DECIMAL
    },
    weight:{
        type:DataType.INTEGER
    },
    attendedto:
    {
        type:DataType.BOOLEAN
    },
    prescription:
    {
        type:DataType.STRING
    },
    actiontaken:{
        type:DataType.STRING
    },
    istesttaken:{
        type:DataType.BOOLEAN
    },
    testresultid:{
        type:DataType.INTEGER
    }
})


module.exports=MedicalHistoryModel;

