import {axiosMethod, axiosRequest} from '../../utils/fetchUtil';

const apiEndPoint = 'http://65.108.79.164:7200/api/services/app';
const authenEndPoint = apiEndPoint + '/Account';

export const authenAPI = {
  loginAPI: data => {
    return axiosRequest(
      authenEndPoint + '/Login',
      axiosMethod.POST,
      null,
      null,
      data,
    );
  },

  registerAPI: data => {
    return axiosRequest(
      authenEndPoint + '/Register',
      axiosMethod.POST,
      null,
      null,
      data,
    );
  },
};
