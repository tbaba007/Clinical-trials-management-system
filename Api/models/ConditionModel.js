const DataType=require('sequelize');
const db = require('../config/database');

const ConditionModel= db.define('condition',{
    name:{
        type:DataType.STRING
    },
    downcase_name:{
        type:DataType.STRING
    }
})

module.exports=ConditionModel;