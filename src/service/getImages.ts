import { get } from './core/get';

interface ImageRespose {
    id: string;
    url: string
}

export const getAnimalImages = async (count = 5): Promise<any> => {
    try {
        return get(`https://preact-infinitescroll.herokuapp.com/animals?count=${count}`);
    }
    catch (e) {
        // ignore as this is not critical 
    };
    return getAnimalImages();
};