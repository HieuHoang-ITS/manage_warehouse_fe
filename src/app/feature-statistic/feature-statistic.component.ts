import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThongKe } from '../models/ThongKe';
import { ThongkeService } from '../services/thongke.service';

@Component({
  selector: 'app-feature-statistic',
  templateUrl: './feature-statistic.component.html',
  styleUrls: ['./feature-statistic.component.scss']
})
export class FeatureStatisticComponent implements OnInit {
  datapie: any;

  chartOptionspie: any;
  datapie1: any;

  chartOptionspie1: any;
  

  cities: City[] =[];
  selectedCity?: City ;
  data: any;
  chartOptions: any;
  displayModal: boolean = false;
  displayModalpie: boolean = false;
  basicData: any;
  basicOptions: any;
  date9?: Date;
  date10?: Date;

  dates?: Date[];
  thongkethang: ThongKe[] = [];
  rangeDates?: Date[]

  minDate?: Date

  maxDate?: Date
  thang: any[] = [];
  tienThang: ThongKe[] = []
  invalidDates?: Array<Date>

  
  constructor(private thongkeService: ThongkeService) {this.cities = [
    {name: 'Mặt hàng 1', code: 'NY'},
    {name: 'Mặt hàng 2', code: 'RM'},
    {name: 'Mặt hàng 3', code: 'LDN'},
    {name: 'Mặt hàng 4', code: 'IST'},
    {name: 'Mặt hàng 5', code: 'PRS'}
]; }
  showModalDialog() {
    this.displayModal = true;
}
showModalDialogpie() {
  this.displayModalpie = true;
}

  ngOnInit(): void {
    this.datapie = {
      labels: ['NHẬP'],
      datasets: [
          {
              data: [60, 40,],
              backgroundColor: [
                  
                  "#66BB6A",
                  "#FFA726"
              ],
              hoverBackgroundColor: [
                  
                  "#81C784",
                  "#FFB74D"
              ]
          }
      ]
  };
  this.datapie1 = {
    labels: ['XUẤT'],
    datasets: [
        {
            data: [40, 60,],
            backgroundColor: [
                
                "#66BB6A",
                "#FFA726"
            ],
            hoverBackgroundColor: [
                
                "#81C784",
                "#FFB74D"
            ]
        }
    ]
};
    this.data = {
      labels: ['Tổng số hàng hóa nhập','Tổng số hàng hóa xuất',],
      datasets: [
          {
              data: [300, 50, ],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  
              ]
          }
      ]
    };
    
    let playStore: any = [];
    let playStor: any = [];
    this.thongkeService.getDoanhThuTheoThang().subscribe(data => {
      this.thongkethang = data;
      //  console.log(this.thongkethang)
      data.forEach(function (value) {
        playStore.push(value.gia);
        playStor.push(value.thang)
      });
    })
    //console.log(playStore);
    this.tienThang = playStore;
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'],
      datasets: [
        {
          label: 'Doanh thu theo tháng',
          data: this.tienThang,
          fill: false,
          borderColor: '#42A5F5'
          ,
          tension: .4
        }
      ]
    }
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }
  loading = [false, false, false, false]

  load(index: any) {
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 1000);
  }

}
interface City {
  name: string,
  code: string
}

