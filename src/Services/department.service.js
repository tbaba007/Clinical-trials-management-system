import {
    Api
} from '../Helper/Api';
const response = require('./handleresponse.service');
const httpHelper = require('../Helper/HttpContent');

const getDepartments = () => {
    return fetch(Api + 'department/getAll').then(response.handleResponseJson)
}
const addDepartment = (departmentModel) => {
    return fetch(Api + 'department/Add', httpHelper.Post(departmentModel))
        .then(response.handleResponseText)
}
const updateDepartment=(id,updateModel)=>{
    return fetch(Api+'department/update/'+id,httpHelper.Put(updateModel))
    .then(response.handleResponseText)
}
const deleteDepartment=(id)=>{
    return fetch(Api+'department/delete/'+id,httpHelper.Delete())
    .then(response.handleResponseText)
}

export{
    deleteDepartment,
    updateDepartment,
    addDepartment,
    getDepartments
}