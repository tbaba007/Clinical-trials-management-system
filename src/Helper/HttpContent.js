

const Put=()=>{
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      
    };
    return requestOptions;
}
const Delete=()=>{
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }    };
    return requestOptions;

}

const Get=()=>{
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return requestOptions;
}

const Post=(model)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    };
    return requestOptions;

}

export{
    Put,
    Delete,
    Get,
    Post
}
