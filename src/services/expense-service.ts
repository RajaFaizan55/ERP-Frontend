import { ApiService } from './api-services';

interface Expense {
  date: string;
  category: string;
  description: string;
  amount: string;
  remarks: string;
}
export default class ExpenseService {
  static baseUrl = ['expenses'];

  static async getAllExpense(data?: any) {
    const res = await ApiService.get(`${ExpenseService.baseUrl[0]}/`, {
      params: data,
    });
    return res;
  }
  static async getExpenseById(id: string) {
    const res = await ApiService.get(`${ExpenseService.baseUrl[0]}/${id}`);
    return res;
  }
  static async addExpense(data: Expense) {
    const res = await ApiService.post(`${ExpenseService.baseUrl[0]}/`, data);
    return res;
  }
  static async updateExpense(id: string, data: Expense) {
    const res = await ApiService.put(
      `${ExpenseService.baseUrl[0]}/${id}`,
      data,
    );
    return res;
  }
  static async deleteExpense(id: string | number) {
    const res = await ApiService.delete(`${ExpenseService.baseUrl[0]}/${id}`);
    return res;
  }

  static async getExplore(data?: any) {
    const res = await ApiService.get(`${ExpenseService.baseUrl[0]}/explore`, {
      params: data,
    });
    return res;
  }
}
