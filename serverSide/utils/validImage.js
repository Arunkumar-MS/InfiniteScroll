const { ALLOWED_IMAGE_FORMATE } = require('../constents');

const hasValidImage = (url = '') => {
    const extention = getImageExtention(url);
    return ALLOWED_IMAGE_FORMATE.includes(extention.toLocaleLowerCase());
}

const getImageExtention = (url = '') => {
    const fragments = url.split('.');
    if (fragments.length) {
        return fragments[fragments.length - 1];
    }
    return '';
}

module.exports = {
    hasValidImage,
}