import {
    Api
} from '../Helper/Api';
const response = require('./handleresponse.service');
const httpHelper = require('../Helper/HttpContent');

const addTestResult=(model)=>{
    return fetch(Api+'testresult/add',httpHelper.Post(model))
    .then(response.handleResponseText)
}
const getPendingTestToday=(date)=>{
    return fetch(Api+'medicalhistory/getPendingTest/'+date)
    .then(response.handleResponseJson)
}
export{
    addTestResult,
    getPendingTestToday
}