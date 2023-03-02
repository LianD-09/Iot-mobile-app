import {axiosMethod, axiosRequest} from '../../utils/fetchUtil';

const apiEndPoint = 'http://65.108.79.164:7200/api/services/app';
const userEndPoint = apiEndPoint + '/VerifyUserForm';

export const assignAPI = {
  createFormAPI: (data, token) => {
    return axiosRequest(
      userEndPoint + `/UserCreateOrUpdateForm`,
      axiosMethod.POST,
      token,
      null,
      data,
    );
  },
};
