import {
    Api
} from '../Helper/Api';
const response = require('./handleresponse.service');
const httpHelper = require('../Helper/HttpContent');

const getAllRoles=()=>{
    return fetch(Api+'role/getAll',httpHelper.Get()).then(response.handleResponseJson)
}

export{
    getAllRoles
}