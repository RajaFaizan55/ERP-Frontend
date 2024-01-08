import { ApiService } from './api-services';

interface Attendance {
  employeeId: string;
  loginTime: string;
  logoutTime: string;
  date: string;
  status: string;
}
export default class AttendanceService {
  static baseUrl = ['attendances'];

  static async getAllAttendance(data?: any) {
    const res = await ApiService.get(`${AttendanceService.baseUrl[0]}/`, {
      params: data,
    });
    return res;
  }
  static async getAttendanceById(id: string) {
    const res = await ApiService.get(`${AttendanceService.baseUrl[0]}/${id}`);
    return res;
  }
  static async addAttendance(data: Attendance) {
    const res = await ApiService.post(`${AttendanceService.baseUrl[0]}/`, data);
    return res;
  }
  static async updateAttendance(id: string, data: Attendance) {
    const res = await ApiService.put(
      `${AttendanceService.baseUrl[0]}/${id}`,
      data,
    );
    return res;
  }
  static async deleteAttendance(id: string | number) {
    const res = await ApiService.delete(
      `${AttendanceService.baseUrl[0]}/${id}`,
    );
    return res;
  }
}
