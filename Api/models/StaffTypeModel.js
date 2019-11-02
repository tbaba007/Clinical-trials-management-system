const DataType=require('sequelize');
const db = require('../config/database');

const StaffTypeModel=db.define('stafftype',{
    
    name:{
        type:DataType.STRING
    },
    createdby:{
        type:DataType.INTEGER
    }
})

module.exports=StaffTypeModel;