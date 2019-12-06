import {Api} from '../Helper/Api';
const httpContent=require('../Helper/HttpContent');


const login = (username, password) => {
    return fetch(Api + 'user/login', httpContent.Post({username:username,
        password:password}))
    .then(require('./handleresponse.service').handleResponseJson)
}

const resetpassword=(username)=>{
    return fetch(Api + 'user/resetpassword/'+username, httpContent.Put())
    .then(require('./handleresponse.service').handleResponseText)
}

export{
    login,
    resetpassword
}