export interface Order{
    if: any;
    user_id: number;
    trading_type: string;
    customer_name: string;
    customer_phone: string;
    status: string;
    description: string;
    total_price: number;
    created_at: Date;
}
