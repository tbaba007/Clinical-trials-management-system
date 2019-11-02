const DataType=require('sequelize');
const db = require('../config/database');

const SpecialtyModel=db.define('specialty',{
    
    name:{
        type:DataType.STRING
    },
    createdby:{
        type:DataType.INTEGER
    }
})

module.exports=SpecialtyModel;