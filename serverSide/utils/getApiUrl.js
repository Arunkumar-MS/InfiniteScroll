const { IMAGE_API_URL } = require('../constents');
const getApiUrl = () => IMAGE_API_URL[randomNumber(IMAGE_API_URL.length - 1)];


const randomNumber = (max, min = 0) => Math.floor(Math.random() * (max - min) + min);

module.exports = {
    getApiUrl,
} 