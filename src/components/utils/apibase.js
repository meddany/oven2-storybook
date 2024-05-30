
import axios from 'axios';

// Create a new Axios instance with a base URL
export const BuildAPi = ( baseUrl ) => {
  const buildApi = axios.create({
    baseURL: baseUrl ,
  });

  return buildApi
}

export const createApiRequest = () => {
  const controller = new AbortController();
  const signal = controller.signal;

  const request = {
    controller,
    signal,
  };
  return request;
};

// Function to abort an ongoing request
export const abortRequest = (request) => {
  if (request && request.controller) {
    request.controller.abort();
  }
};



