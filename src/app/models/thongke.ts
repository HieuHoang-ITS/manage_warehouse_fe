export interface ThongKe {
    thang: number | undefined;
    gia: number | undefined;
} 

export interface pieChart{
    nameloai: string;
    tongsanpham: number;
    tongsoluong: number;
    phantram: number;
}
export interface doughChart{
    nameloai: string;
    tongsanpham: number;
    tongsoluong: number;
    phantram: number;
}

export interface productTable{
    id:number;
	name:string ;
	total_price:number;
	soluong:number;
}