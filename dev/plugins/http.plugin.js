import axios from 'axios';
import QS from 'qs';

axios.defaults.paramsSerializer = (parameterRequest) => QS.stringify(parameterRequest, { format: 'RFC3986', arrayFormat: 'brackets' });


// Add a response interceptor
axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response
        && error.response.status >= 400
        && error.response.status < 500;


  if (error.response.status === 401) {
    window.location = '/login';
  }

  if (!expectedError) {
    console.log('Http Plugin: Loggin the error', error);
  }

  return Promise.reject(error);
});


export default {
  install(Vue) {
    Vue.prototype.$http = axios;
  },
};
