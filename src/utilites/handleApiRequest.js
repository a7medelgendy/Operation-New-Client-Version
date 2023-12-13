import axios from "axios";

const BASE_URL = "http://10.10.5.28:8000";
//export const BASE_URL = "http://172.18.8.103:8000";

export const handleRequest = async (method, endpoint, paramsOrData = null) => {
    try {
        // Configure the Axios request
        const axiosConfig = {
            method,
            url: `${BASE_URL}/${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
                // Additional headers if necessary
            },
            data: method !== 'GET' ? paramsOrData : undefined,
            params: method === 'GET' ? paramsOrData : undefined,
        };

        // Make the request
        const response = await axios(axiosConfig);

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

/* export const get = async (endpoint, params = null) => {
    return handleRequest('GET', endpoint, params);
};

export const post = async (endpoint, data = null) => {
    return handleRequest('POST', endpoint, data);
}; */