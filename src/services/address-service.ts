import { ApiService } from './api-services';

export default class AddressService {
  static baseUrl = ['address'];

  static async getCountryStateCityData(data: {
    country?: string;
    state?: string;
  }) {
    const res = await ApiService.get(`${AddressService.baseUrl[0]}/`, {
      params: data,
    });
    return res;
  }
}
