class RestClient{
    static get methods(){
        return{
            get: 'GET',
            post: 'POST',

        }
    }
    static call(route, params = {}, method = undefined){
        const headers = {
            Accept: '*/*',
        }

        if(method === RestClient.methods.post){
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        const config={
            method,
            headers,
        };

        const query = new URLSearchParams(params).toString()

        if (method === RestClient.methods.post){
            config.body = query;
        } else if (method === RestClient.methods.get) {
            route = route + '?' + query;
        }

            return fetch(route, config);
    }
}
export {RestClient};

