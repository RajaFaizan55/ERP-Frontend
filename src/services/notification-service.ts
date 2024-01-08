import { ApiService } from './api-services';

export default class NotificationService {
  static baseUrl = ['notifications'];

  static async addNotification(data: any) {
    const res = await ApiService.post(
      `${NotificationService.baseUrl[0]}/`,
      data,
    );
    return res;
  }

  static async getAllNotifications(data?: any) {
    const res = await ApiService.get(`${NotificationService.baseUrl[0]}/`, {
      params: data,
    });
    return res;
  }
}
