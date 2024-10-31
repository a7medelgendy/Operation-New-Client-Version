import axios from 'axios';
import { baseUrl } from '../shared/staticData';

//const baseUrl = "http://10.10.5.28:8000";
//export const baseUrl = "http://172.18.8.103:8000";
import user from '../shared/user.js';


export const handleRequest = async (method, endpoint, params = null) => {
  try {
    // Configure the Axios request
    // let token = null;
    // if (params?.token !== 'login') {
    //   token = user.getAccessToken();
    // }
      let token = user.getAccessToken();
    const axiosConfig = {
      method,
      url: `${baseUrl}/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      data: method !== 'GET' ? params : undefined,
      params: method === 'GET' ? params : undefined
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
