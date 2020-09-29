const fetch = require('node-fetch');
const { fromString } = require('uuidv4');
const { getApiUrl } = require('../utils/getApiUrl');
const { hasValidImage } = require('../utils/validImage');
const { sortBaseOnFileSize } = require('../utils/sortResult');


const mapAandValidateData = (response = []) => {
    const mapSet = {};
    return response.reduce((result, item) => {
        if (item.status === 'fulfilled') {
            const { url = '', file = '', image = '', fileSizeBytes= 0 } = item && item.value || {};
            console.log(item);
            const imageUrl = url || file || image;
            if (hasValidImage(imageUrl) && !mapSet[imageUrl]) {
                mapSet[imageUrl] = true; // removing duplicates from current list
                const id = fromString(imageUrl); // get an id for an image 
                result.push({ url: imageUrl, id, fileSizeBytes });
            }
        }
        return sortBaseOnFileSize(result); // this will push down the big images below so that user can see light weight image faster
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


// hack to keep the app alive always on heroku 
setInterval(() => {
    fetch('https://infinitescroll-react.herokuapp.com/').then((html) => { }).catch((e) => { });
}, 15 * 60 * 1000);