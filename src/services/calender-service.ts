import { ApiService } from './api-services';

interface EventData {
  date: string;
  description: string;
  participants: {
    email: string;
    employeeId: string;
    name: string;
  }[];
  recursion: string;
  time: string;
  title: string;
  type: string;
}

export default class CalenderService {
  static baseUrl = ['calender'];

  static async getAllEvents(params?: any) {
    const res = await ApiService.get(`${CalenderService.baseUrl[0]}/`, {
      params,
    });
    return res;
  }

  static async getEventById(id: string) {
    const res = await ApiService.get(`${CalenderService.baseUrl[0]}/${id}`);
    return res;
  }

  static async addEvent(data: EventData) {
    const res = await ApiService.post(`${CalenderService.baseUrl[0]}/`, data);
    return res;
  }

  static async updateEvent(id: string, data: EventData) {
    const res = await ApiService.put(
      `${CalenderService.baseUrl[0]}/${id}`,
      data,
    );
    return res;
  }

  static async deleteEvent(id: string) {
    const res = await ApiService.delete(`${CalenderService.baseUrl[0]}/${id}`);
    return res;
  }
}
