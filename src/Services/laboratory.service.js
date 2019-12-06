import {
    Api
} from '../Helper/Api';
const response = require('./handleresponse.service');
const httpHelper = require('../Helper/HttpContent');

const addTestResult=(model)=>{
    return fetch(Api+'testresult/add',httpHelper.Post(model))
    .then(response.handleResponseText)
}
