import {
    Api
} from '../Helper/Api';
const response = require('./handleresponse.service');
const httpHelper = require('../Helper/HttpContent');

const fetchDisease = () => {
    return fetch(Api + 'condition/getAll')
        .then(response.handleResponseJson)
}

const addDisease=(diseaseModel)=>{
    return fetch(Api+'condition/add',httpHelper.Post(diseaseModel))
    .then(response.handleResponseText)
}

const updateDisease=(id)=>{
    return fetch(Api+'condition/update/'+id,httpHelper.Put())
    .then(response.handleResponseText)
}
const deleteDisease=(id)=>{
    return fetech(Api+'condition/delete/'+id,httpHelper.Delete())
    .then(response.handleResponseText)
}
const getDiseaseByName=(name)=>{
return fetch(Api+'condition/search/'+name)
.then(response.handleResponseJson)
}

export{
    deleteDisease,
    updateDisease,
    addDisease,
    fetchDisease,
    getDiseaseByName
}