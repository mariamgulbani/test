
class RestClient {
    static call (url, params = {}){
        return fetch(url,{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then((response)=> response.json())
    }
}

export {RestClient};

