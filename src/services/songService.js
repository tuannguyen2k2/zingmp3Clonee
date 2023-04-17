import * as httpRequest from '~/utils/httpRequest';

export const infoSong = async (id) => {
    try {
        const res = await httpRequest.get(`/infosong`, {
            params: {
                id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const audioSong = async (id) => {
    try {
        const res = await httpRequest.get(`/song`, {
            params: {
                id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const playList = async (id) => {
    try {
        const res = await httpRequest.get('/detailplaylist', {
            params: {
                id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
