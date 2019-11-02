const DataType=require('sequelize');
const db = require('../config/database');


const DepartmentModel= db.define('department',{
    name:{
        type:DataType.STRING
    },
    createdby:{
        type:DataType.INTEGER
    }
})


module.exports=DepartmentModel;