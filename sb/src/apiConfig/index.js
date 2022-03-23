import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3555',
    headers: {
        post: {
            "cache-control": "no-cache, private",
            "content-type": "application/json",
            "x-ratelimit-limit": "60",
            "x-ratelimit-remaining": "59",
            "access-control-allow-origin": "*",

        }
    }
});

module.exports = axiosInstance;