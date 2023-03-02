import {axiosMethod, axiosRequest} from '../../utils/fetchUtil';

const apiEndPoint = 'http://65.108.79.164:7200/api/services/app';
const userEndPoint = apiEndPoint + '/Apartment';

export const apartmentAPI = {
  getAllAPI: (params, token) => {
    return axiosRequest(
      userEndPoint + `/GetApartments`,
      axiosMethod.GET,
      null,
      null,
      null,
    );
  },
};
