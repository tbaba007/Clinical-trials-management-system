

const handleResponseJson = (response) => {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}

const handleResponseText=(response)=>{
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.text();
}

export{
    handleResponseJson,
    handleResponseText
}
