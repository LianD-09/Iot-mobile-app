import {axiosMethod, axiosRequest} from '../../utils/fetchUtil';

const apiEndPoint = 'http://65.108.79.164:7200/api/services/app';
const userEndPoint = apiEndPoint + '/User';

export const userAPI = {
  getUserAPI: (params, token) => {
    return axiosRequest(
      userEndPoint + `/GetUserInformation`,
      axiosMethod.GET,
      token,
      params,
      null,
    );
  },

  updateUserAPI: (data, token) => {
    return axiosRequest(
      userEndPoint + '/UpdateUserInformation',
      axiosMethod.POST,
      token,
      null,
      data,
    );
  },
};
