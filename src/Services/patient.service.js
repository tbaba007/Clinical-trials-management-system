import {Api} from '../Helper/Api';
const response = require('./handleresponse.service');


const addPatient = (patientModel) => {
    return fetch(Api + "patient/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientModel)
    }).then(response.handleResponseText)
}

const fetchPatients=()=>{
    return fetch(Api+"patient/getall")
    .then(response.handleResponseJson)
}

const fetchDoctors=()=>{
    return fetch(Api+"user/getAll")
    .then(response.handleResponseJson)
}

const deletePatient=(id)=>{
    return fetch(Api+"patient/delete/"+id,require('../Helper/HttpContent').Delete()
    ).then(response.handleResponseText)
}

export{
    addPatient,
    fetchDoctors,
    fetchPatients,
    deletePatient
}