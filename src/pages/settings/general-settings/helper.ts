export interface GeneralSettingUpdateUser {
  employeeId?: string;
  userName?: string;
  email?: string;
  password: string;
  confirmPassword?: string;
  role?: string;
  img?: string;
}
