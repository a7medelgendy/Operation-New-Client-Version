import axios from 'axios';
import { baseUrl } from '../shared/staticData';
import user from '../shared/user.js';
import { DecryptResponse } from './DecryptResponse.jsx';

export const handleRequest = async (method, endpoint, params = null, responseType = null) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    // Configure the Axios request
    // let token = null;
    // if (params?.token !== 'login') {
    //   token = user.getAccessToken();
    // }

    let token = user.getAccessToken();
    const axiosConfig = {
      method,
      url: `${apiUrl}${endpoint}`, //change this according to the environment development ==> `${baseUrl}/${endpoint}` production ==> `${endpoint}`
      responseType: responseType, // Ensure axios handles the response as a Blob (binary data)
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      data: method !== 'GET' ? params : undefined,
      params: method === 'GET' ? params : undefined
    };

    // Make the request
    const response = await axios(axiosConfig);

    //  Decrypt the response 
    let decryptResponse = DecryptResponse(method, response);
    return decryptResponse;
  } catch (error) {
    // console.log('Error:', error);
    throw error;
  }
};

/* export const get = async (endpoint, params = null) => {
    return handleRequest('GET', endpoint, params);
};

export const post = async (endpoint, data = null) => {
    return handleRequest('POST', endpoint, data);
}; */
