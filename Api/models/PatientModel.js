
const DataType=require('sequelize');
const db = require('../config/database');
const PatientModel= db.define('patient',{
    name:{
        type:DataType.STRING
    },
    address:{
        type:DataType.STRING
    },
    mobilenumber:{
        type:DataType.STRING
    },
    dateregistered:{
        type:DataType.STRING
    },
    createdby:{
        type:DataType.INTEGER
    },
    email:{
        type:DataType.STRING
    }
})


module.exports=PatientModel;

