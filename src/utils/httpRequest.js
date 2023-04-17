import axios from 'axios';

export const httpRequest1 = axios.create({ baseURL: 'https://api-zing-mp3-chi.vercel.app/api/' });

export const get = async (api, options = {}) => {
    const response = await httpRequest1.get(api,options);
    return response.data
}
