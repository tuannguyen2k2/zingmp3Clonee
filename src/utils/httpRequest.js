import axios from 'axios';

export const httpRequest = axios.create({ baseURL: 'http://localhost:5000/api/' });

export const get = async (api, options = {}) => {
    const response = await httpRequest.get(api,options);
    return response.data
}