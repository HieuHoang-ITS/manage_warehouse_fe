import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feature-statistic',
  templateUrl: './feature-statistic.component.html',
  styleUrls: ['./feature-statistic.component.scss']
})
export class FeatureStatisticComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  date9: Date;
  dates: Date[]

  rangeDates: Date[] 

  minDate: Date 

  maxDate: Date 

  invalidDates: Array<Date> 
  constructor() { }


  ngOnInit(): void {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'],
      datasets: [
        {
          label: 'Doanh thu xuất khẩu',
          data: [100000000, 120000000, 80000000, 70000000, 180000000, 10000000, 300000000, 50000000, 60000000, 170000000, 190000000, 30000000],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Doanh thu nhập khẩu',
          data: [300000000, 120000000, 130000000, 100000000, 160000000, 200000000, 350000000, 53000000, 90000000, 110000000, 210000000, 68000000],
          fill: false,
          borderColor: '#FFA726',
          tension: .4
        },





      ]
    }
    let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
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
        this.invalidDates = [today,invalidDate];
    }

  }
