import { ApiService } from './api-services';
// import { GeneralSettingUpdateUser } from 'pages/settings/general-settings/helper';
// import { ManageAccountsEditEmployee } from 'pages/settings/manage-accounts/manage-accounts-helper';

export default class ApplicationService {
  static baseUrl = ['applications'];

  static async getAllApplications(data?: { page: number; pageSize: number }) {
    const res = await ApiService.get(`${ApplicationService.baseUrl[0]}/`, {
      ...(data && {
        params: data,
      }),
    });
    return res;
  }
  static async getApplicationById(id: string) {
    const res = await ApiService.get(`${ApplicationService.baseUrl[0]}/${id}`);
    return res;
  }

  static async applyApplication(data: any) {
    const res = await ApiService.post(
      `${ApplicationService.baseUrl[0]}/`,
      data,
    );
    return res;
  }

  static async updateApplication(data: any) {
    const res = await ApiService.put(
      `${ApplicationService.baseUrl[0]}/${data._id}`,
      data,
    );
    return res;
  }

  static async deleteApplication(id: string) {
    const res = await ApiService.delete(
      `${ApplicationService.baseUrl[0]}/${id}`,
    );
    return res;
  }
}
