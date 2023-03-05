import {axiosMethod, axiosRequest} from '../../utils/fetchUtil';

const apiEndPoint = 'http://65.108.79.164:7200/api/services/app';
const userEndPoint = apiEndPoint + '/AccessHistory';

export const accessHistoryAPI = {
  getAccessHistoryAPI: (params, token) => {
    return axiosRequest(
      userEndPoint + `/GetAccessHistory`,
      axiosMethod.GET,
      token,
      params,
      null,
    );
  },
};