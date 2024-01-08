import { ApiService } from './api-services';

export default class AccommodationService {
  static baseUrl = ['accommodation'];

  static async getAllAttendance(data?: any) {
    const res = await ApiService.get(`${AccommodationService.baseUrl[0]}/`, {
      params: data,
    });
    return res;
  }
  static async getAttendanceById(id: string) {
    const res = await ApiService.get(
      `${AccommodationService.baseUrl[0]}/${id}`,
    );
    return res;
  }
  static async addAccommodation(data: any) {
    const res = await ApiService.post(
      `${AccommodationService.baseUrl[0]}/`,
      data,
    );
    return res;
  }
  static async updateAttendance(id: string, data: any) {
    const res = await ApiService.put(
      `${AccommodationService.baseUrl[0]}/${id}`,
      data,
    );
    return res;
  }
  static async deleteAttendance(id: string) {
    const res = await ApiService.delete(
      `${AccommodationService.baseUrl[0]}/${id}`,
    );
    return res;
  }
}
