import axios from 'axios';

export const httpRequest1 = axios.create({ baseURL: 'http://localhost:5000/api/' });

export const get = async (api, options = {}) => {
    const response = await httpRequest1.get(api,options);
    return response.data
}
