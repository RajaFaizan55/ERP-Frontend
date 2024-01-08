import { ManageAccountsAddUser } from 'pages/settings/manage-accounts/manage-accounts-helper';
import { ApiService } from './api-services';

export default class AuthService {
  static baseUrl = ['auth'];

  static async login(credentials: { employeeId: string; password: string }) {
    const res = await ApiService.post(
      `${AuthService.baseUrl[0]}/login`,
      credentials,
    );
    return res;
  }

  static async addUser(credentials: ManageAccountsAddUser) {
    const res = await ApiService.post(
      `${AuthService.baseUrl[0]}/sign-up`,
      credentials,
    );
    return res;
  }

  static async getUserData(id: string | number) {
    const res = await ApiService.get(`${AuthService.baseUrl[0]}/${id}`);
    return res;
  }
  static async forgetPassword(email: string) {
    const res = await ApiService.post(`${AuthService.baseUrl[0]}/forget`, {
      email,
    });
    return res;
  }
  static async resetPassword({
    password,
    token,
  }: {
    password: string;
    token: string;
  }) {
    const res = await ApiService.post(`${AuthService.baseUrl[0]}/reset`, {
      password,
      token,
    });
    return res;
  }
}
