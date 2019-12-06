import {
    Api
} from '../Helper/Api';
const response = require('./handleresponse.service');
const httpHelper = require('../Helper/HttpContent');


const addStaff = (staffModel) => {
    return fetch(Api + 'user/add', httpHelper.Post(staffModel))
        .then(response.handleResponseText)
}
const getAllStaff = () => {
    return fetch(Api + 'user/getAll')
        .then(response.handleResponseJson)
}
const updateStaff = (id, staffModel) => {
    return fetch(Api + 'user/update/' + id, httpHelper.Put(staffModel))
        .then(response.handleResponseText)
}
const deleteStaff = (id) => {
    return fetch(Api + 'user/delete/' + id, httpHelper.Delete())
        .then(response.handleResponseText)
}
const getStaffType=()=>{
    return fetch(Api+'stafftype/getall')
    .then(response.handleResponseJson)
}
const getStaffSpecialty=()=>{
    return fetch(Api+'specialty/getall')
    .then(response.handleResponseJson)
}

export{
    deleteStaff,
    updateStaff,
    getAllStaff,
    addStaff,
    getStaffType,
    getStaffSpecialty
}