const DataType=require('sequelize');
const db = require('../config/database');
const RoleModel = require('../models/RoleModel');
const TestResultModel=db.define('testresult',{
    patientid:{
        type:DataType.INTEGER
    },
    testrecommendedby:{
        type:DataType.INTEGER
    },
    testdetails:{
        type:DataType.STRING
    },
    testupload:{
        type:DataType.STRING
    },
    uploadedby:{
        type:DataType.INTEGER
    },
    testdobneby:{
        type:DataType.INTEGER
    },
    datedone:{
        type:DataType.DATE
    }
    
})




module.exports=TestResultModel;

