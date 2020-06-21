import { get } from './core/get';

interface ImageRespose {
    id: string;
    url: string
}

export const getAnimalImages = async (count = 5): Promise<any> => {
    try {
        return get(`http://localhost:3000/animals?count=${count}`);
    }
    catch (e) {
        // ignore as this is not critical 
    };
    return getAnimalImages();
};