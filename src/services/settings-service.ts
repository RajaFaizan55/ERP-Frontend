import { ApiService } from './api-services';
import { GeneralSettingUpdateUser } from 'pages/settings/general-settings/helper';
import { ManageAccountsEditEmployee } from 'pages/settings/manage-accounts/manage-accounts-helper';

export default class SettingsService {
  static baseUrl = ['settings'];

  static async getUserData(id: string | number) {
    const res = await ApiService.get(`${SettingsService.baseUrl[0]}/${id}`);
    return res;
  }

  static async getAllUsers(data?: any) {
    const res = await ApiService.get(`${SettingsService.baseUrl[0]}/`, {
      params: data,
    });
    return res;
  }

  static async editEmployee(
    id: string,
    employeeData: ManageAccountsEditEmployee,
  ) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/${id}/manage-account`,
      employeeData,
    );
    return res;
  }

  static userUpdate(
    id: string | number,
    credentials: GeneralSettingUpdateUser,
  ) {
    const res = ApiService.put(
      `${SettingsService.baseUrl[0]}/${id}/general`,
      credentials,
    );

    return res;
  }

  static async deleteEmployee(id: string | number) {
    const res = await ApiService.delete(`${SettingsService.baseUrl[0]}/${id}`);
    return res;
  }
}
