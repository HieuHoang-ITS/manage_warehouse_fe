export interface Order {
  id?: any;
  user_id: string;
  trading_type: string;
  customer_name: string;
  customer_phone: string;
  status: string;
  description: string;
  total_price: number;
  created_at: Date;
}
