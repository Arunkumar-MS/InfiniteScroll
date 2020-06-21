const fetch = require('node-fetch');
const { fromString } = require('uuidv4');
const { getApiUrl } = require('../utils/getApiUrl');
const { hasValidImage } = require('../utils/validImage');
const { sortBaseOnFileSize } = require('../utils/sortResult');


const mapAandValidateData = (response = []) => {
    const mapSet = {};
    return response.reduce((result, item) => {
        if (item.status === 'fulfilled') {
            const { url = '', file = '', image = '', fileSizeBytes= 0 } = item.value;
            console.log(item);
            const imageUrl = url || file || image;
            if (hasValidImage(imageUrl) && !mapSet[imageUrl]) {
                mapSet[imageUrl] = true; // for removing duplicates from current list;
                result.push({ url: imageUrl, id: fromString(imageUrl), fileSizeBytes });
            }
        }
        return sortBaseOnFileSize(result);
    }, []);
}

const createPromiseList = (length = 20) => {
    const promiseList = [];
    while (length > 0) {
        promiseList.push(fetch(getApiUrl()).then(res => res.json()).catch(() => { }));
        length--;
    }
    return promiseList;
}

const getAnimalsImages = async (req, res) => {
    const promiseList = createPromiseList(req.query.count);
    try {
        const response = await Promise.allSettled(promiseList);
        return res.send(mapAandValidateData(response));
    }
    catch (e) {
        console.log('log exception', e)
    }
    return res.send({});
}

module.exports = {
    getAnimalsImages,
}