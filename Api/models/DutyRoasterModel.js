const DataType=require('sequelize');
const db = require('../config/database');

const DutyRoasterModel= db.define('dutyroaster',{
    staffid:{
        type:DataType.INTEGER
    },
    shift:{
        type:DataType.STRING
    },
  
})

module.exports=DutyRoasterModel;
