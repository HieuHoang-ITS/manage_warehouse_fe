import { Order } from './order';

export interface OrderDisplay {
  id?: any;
  user_id: string;
  trading_type: string;
  customer_name: string;
  customer_phone: string;
  status: string;
  description: string;
  total_price: number;
  created_at: Date;
  user_name: string;
}

export interface productDisplay {
  id: any;
  provider_id: any;
  product_name: string;
  category_name: string;
  provider_name: string;
  provider_address: string;
  amount: number;
  unit: string;
  category_status: string;
  price: number;
  order_amount: number;
}

export interface DetailOrderDisplay {
  id: number;
  product_name: string;
  category_name: string;
  provider_name: string;
  provider_address: string;
  provider_tel: string;
  product_unit: string;
  category_status: string;
  amount: number;
}
export interface DetailListUpdate {
  product_id: any;
  order_id: any;
  amount: number;
}
export interface newOrderSave {
  order: Order;
  details: DetailListUpdate[];
}
export interface Filters {
  id: string;
  username: string;
  status: string;
  toDate: string;
  fromDate: string;
}
