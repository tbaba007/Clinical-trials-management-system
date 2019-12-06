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
const deleteInfo=id=>{
    return fetch(Api+'medicalhistory/deleteinfo/'+id,httpHelper.Delete())
    .then(response.handleResponseText)
}
const analysis=(id,model)=>{
        return fetch(Api+'medicalhistory/analysis/'+id,httpHelper.Post(model))
        .then(response.handleResponseJson)
}
const medicalHistoryAnalysis=(model)=>{
    return fetch(Api+'medicalhistory/analysis',httpHelper.Post(model))
    .then(response.handleResponseJson)
}
export{
    fetchPendingTestByDate,
    getMedicalHistoryByDate,
    getDetailsById,
    deleteInfo,
    analysis,
    medicalHistoryAnalysis
}