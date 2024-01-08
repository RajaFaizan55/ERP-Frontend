import _axios from 'axios';
import { createNotification } from 'common/create-notification';

export class ApiService {
  static createAxios = () => {
    const token = localStorage.getItem('token') || '';
    return _axios.create({
      baseURL:
        process.env.REACT_APP_API_IS_DEV === 'true'
          ? process.env.REACT_APP_API_BASE_URL_DEV
          : process.env.REACT_APP_API_BASE_URL_PRODUCTION,
      headers: {
        authorization: token,
      },
    });
  };

  static async get(url: string, config?: any): Promise<any> {
    const axios = ApiService.createAxios();
    try {
      const res = await axios.get(url, config);
      return res;
    } catch (error) {
      ApiService.handleError(error);
      return error;
    }
  }

  static async post(url: string, body?: object, config?: any): Promise<any> {
    const axios = ApiService.createAxios();
    try {
      const res = await axios.post(url, body, config);
      if (!res.config.url?.includes('login')) ApiService.handleSuccess(res);
      return res;
    } catch (error) {
      ApiService.handleError(error);
      return error;
    }
  }

  static async put(url: string, body: object, config?: any): Promise<any> {
    const axios = ApiService.createAxios();
    try {
      const res = await axios.put(url, body, config);
      ApiService.handleSuccess(res);
      return res;
    } catch (error) {
      ApiService.handleError(error);
      return error;
    }
  }

  static async delete(url: string, config?: any): Promise<any> {
    const axios = ApiService.createAxios();
    try {
      const res = await axios.delete(url, config);

      ApiService.handleSuccess(res);
      return res;
    } catch (error) {
      ApiService.handleError(error);
      return error;
    }
  }

  private static handleError(error: any) {
    if (error?.response?.data?.msg === 'Session Expired!') {
      localStorage.removeItem('user_id');
      localStorage.removeItem('token');
      window.location.reload();
    }

    createNotification('error', 'Error', error?.response?.data?.msg);
  }
  private static handleSuccess(res: any) {
    if (res.config.url !== 'notifications/') {
      createNotification(
        'success',
        'Success',
        res?.data?.msg || 'Successfully',
      );
    }
  }
}
