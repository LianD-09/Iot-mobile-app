import {axiosMethod, axiosRequest} from '../../utils/fetchUtil';

const apiEndPoint = 'http://65.108.79.164:7200/api/services/app';
const userEndPoint = apiEndPoint + '/QRCode';

export const qrcodeAPI = {
  createQRCodeAPI: (data, token) => {
    return axiosRequest(
      userEndPoint + `/UserCreateQRCode`,
      axiosMethod.POST,
      token,
      null,
      data,
    );
  },
};
