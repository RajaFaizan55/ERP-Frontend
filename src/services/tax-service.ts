import { ApiService } from './api-services';

interface TaxSlab {
  lower: string;
  upper: string;
  fixTax: string;
  taxRate: string;
  lessLimit: string;
}

export default class TaxService {
  static baseUrl = ['tax'];

  static async getAllTaxCalculationData(query?: any) {
    const res = await ApiService.get(`${TaxService.baseUrl[0]}/calculation`, {
      params: query,
    });
    return res;
  }
  static async getAllTaxSlabsData() {
    const res = await ApiService.get(`${TaxService.baseUrl[0]}/`);
    return res;
  }
  static async getTaxSlabById(id: string) {
    const res = await ApiService.get(`${TaxService.baseUrl[0]}/${id}`);
    return res;
  }
  static async AddTaxSlab(data: TaxSlab) {
    const res = await ApiService.post(`${TaxService.baseUrl[0]}/`, data);
    return res;
  }
  static async updateTaxSlab(id: string, data: TaxSlab) {
    const res = await ApiService.put(`${TaxService.baseUrl[0]}/${id}`, data);
    return res;
  }
  static async deleteTaxSlab(id: string) {
    const res = await ApiService.delete(`${TaxService.baseUrl[0]}/${id}`);
    return res;
  }
}
