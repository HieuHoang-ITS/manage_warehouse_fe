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
export interface newOrderSave {
  trading_type: string;
  customer_name: string;
  customer_phone: string;
  status: string;
  total_price: number;
  created_at: Date;
  products: productDisplay[];
}
