import * as httpRequest from '~/utils/httpRequest';

export const home = async () => {
    try {
        const res = await httpRequest.get(`/home`, {});
        return res
    } catch(error) {
        console.log(error)
    }
};