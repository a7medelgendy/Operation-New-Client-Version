import CryptoJS from 'crypto-js';
const secretKey = 'superSecret123';

export const DecryptResponse = (method, response) => {
  if (method === 'GET') {
    let data;
    if (response?.data.result) {
      try {
        const bytes = CryptoJS.AES.decrypt(response.data.result, secretKey);
        const result = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        data = { result };
        return data;
      } catch (error) {
        throw  error;
      }
    }
  } else {
    return response.data;
  }
};
