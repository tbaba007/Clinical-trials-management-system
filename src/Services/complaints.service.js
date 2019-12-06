import {
    Api
} from '../Helper/Api';
const response = require('./handleresponse.service');
const httpHelpers = require('../Helper/HttpContent');

const fetchComplaintsToday = (date) => {
    return fetch(Api + "/medicalhistory/getMedicalHistoryByDate/")
        .then(response.handleResponseJson)
}
const deleteComplaint = (id) => {
    return fetch(Api + "medicalhistory/deletecomplaint/" + id,
        httpHelpers.Delete()).then(response.handleResponseText)
}

const updateComplaint = (id,model) => {
    return fetch(Api + 'medicalhistory/update/' + id,
        httpHelpers.Put(model)).then(response.handleResponseText)

}

const doctorUpdate = (id,model) => {
    return fetch(Api + 'medicalhistory/doctorupdate/' + id,
        httpHelpers.Put(model)).then(response.handleResponseText)
}

export {
    doctorUpdate,
    updateComplaint,
    deleteComplaint,
    fetchComplaintsToday
}