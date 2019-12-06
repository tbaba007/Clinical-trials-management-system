import {
    Api
} from '../Helper/Api';
const response = require('./handleresponse.service');
const httpHelper = require('../Helper/HttpContent');


const getMedicalHistoryByDate = (date) => {
    return fetch(Api + 'medicalhistory/getMedicalHistoryByDate/' + date,
        httpHelper.Get()).then(response.handleResponseJson)
}

const fetchPendingTestByDate=(Today)=>{
    return fetch(Api+'medicalhistory/getPendingTest/'+Today)
    .then(response.handleResponseJson)
}
const getDetailsById=id=>{
    return fetch(Api+'medicalhistory/getbyid/'+id).then(response.handleResponseJson)
}
export{
    fetchPendingTestByDate,
    getMedicalHistoryByDate,
    getDetailsById
}