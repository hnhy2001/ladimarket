import { Component } from '@angular/core';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
 /* Date Range Picker*/
 selected: { startDate: Moment; endDate: Moment; };
  
 ranges: any = {
     Today: [moment(), moment()],
     Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
     'Last 7 Days': [moment().subtract(6, 'days'), moment()],
     'Last 30 Days': [moment().subtract(29, 'days'), moment()],
     'This Month': [moment().startOf('month'), moment().endOf('month')],
     'Last Month': [
     moment()
         .subtract(1, 'month')
         .startOf('month'),
     moment()
         .subtract(1, 'month')
         .endOf('month')
     ],
     'Last 3 Month': [
     moment()
         .subtract(3, 'month')
         .startOf('month'),
     moment()
         .subtract(1, 'month')
         .endOf('month')
     ]
 };
 /* End Date Range Picker */
}
