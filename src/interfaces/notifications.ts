export interface Notification {
  count: number;
  rows: NotificationRow[];
}

export interface NotificationRow {
  _id: string;
  name: string;
  module: string;
  employeeId: string;
  description: string;
  date: string;
  reads?: string[];
  employee?: { img: string }[];
}
