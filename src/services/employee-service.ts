import { ApiService } from './api-services';
import { EmployeeFilterData } from 'pages/employee-details/employee-cards-helper';

export default class EmployeeService {
  static baseUrl = ['employees'];

  static async getAllEmployees(data?: any) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/`, {
      ...(data && {
        params: data,
      }),
    });
    return res;
  }
  static async getSearchedEmployees(data: EmployeeFilterData) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/`, {
      params: data,
    });
    return res;
  }
  static async getEmployee(id: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/${id}`);
    return res;
  }
  static async getEmployeeAttendance(params: any) {
    const res = await ApiService.get(
      `${EmployeeService.baseUrl[0]}/calculate-attendance`,
      {
        params: params,
      },
    );
    return res;
  }
  static async addEmployee(data: any) {
    const res = await ApiService.post(`${EmployeeService.baseUrl[0]}/`, data);
    return res;
  }
  static async updateAddedEmployee(data: any, id: string | Number) {
    const res = await ApiService.put(
      `${EmployeeService.baseUrl[0]}/${id}`,
      data,
    );
    return res;
  }
  static async deleteEmployee(id: string | number) {
    const res = await ApiService.delete(`${EmployeeService.baseUrl[0]}/${id}`);
    return res;
  }
  static async getEmployeePayroll(id: string | number) {
    const res = await ApiService.get(
      `${EmployeeService.baseUrl[0]}/${id}/payroll`,
    );
    return res;
  }
}
