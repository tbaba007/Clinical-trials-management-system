const DataType=require('sequelize');
const db = require('../config/database');

const RoleModel=db.define('role',{
    
    name:{
        type:DataType.STRING
    },
    createdby:{
        type:DataType.INTEGER
    },
    can_access:{
        type:DataType.STRING
    }
})

module.exports=RoleModel;