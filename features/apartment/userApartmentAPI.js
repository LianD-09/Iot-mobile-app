import {axiosMethod, axiosRequest} from '../../utils/fetchUtil';

const apiEndPoint = 'http://65.108.79.164:7200/api/services/app';
const userEndPoint = apiEndPoint + '/UserApartment';

export const userApartmentAPI = {
  getUserAparmentAPI: (params, token) => {
    return axiosRequest(
      userEndPoint + `/GetApartments`,
      axiosMethod.GET,
      token,
      params,
      null,
    );
  },
  getAnUserAparmentAPI: (id, token) => {
    return axiosRequest(
      userEndPoint + `/GetApartments/${id}`,
      axiosMethod.GET,
      token,
      null,
      null,
    );
  },
};