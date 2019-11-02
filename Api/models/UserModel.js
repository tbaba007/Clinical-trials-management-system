const DataType=require('sequelize');
const db = require('../config/database');
const RoleModel = require('../models/RoleModel');
const UserModel=db.define('user',{
    username:{
        type:DataType.STRING
    },
    mobilenumber:{
        type:DataType.STRING
    },
    email:{
        type:DataType.STRING
    },
    address:{
        type:DataType.STRING
    },
    password:{
        type:DataType.STRING
    },
    specialtyid:{
        type:DataType.INTEGER
    },
    stafftypeid:{
        type:DataType.INTEGER
    },
    departmentid:{
        type:DataType.INTEGER
    },
    name:{
        type:DataType.STRING
    },
    datecreated:{
        type:DataType.STRING,
    },
    roleid:{
        type:DataType.INTEGER
    }
})




module.exports=UserModel;

