import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DanhMucService } from 'app/danhmuc.service';
import { NotificationService } from 'app/notification.service';
@Component({
    selector: 'utm-statistic-cmp',
    templateUrl: 'utm-statistic.component.html'
})

export class UtmStatisticComponent implements OnInit {
    REQUEST_URL = "/api/v1/data";

    listEntity = [];
    listCode = [];
    listData = [];
    listDate = [];

    
    constructor(
        private dmService: DanhMucService,
        private notificationService: NotificationService,
       
    ) {
    }
    ngOnInit(): void {
        this.loadData();
    }
        
    public loadData() {
        this.dmService.getOption(null, this.REQUEST_URL, "/statisticByUtmMedium").subscribe(
            (res: HttpResponse<any>) => {
                this.listCode = res.body.RESULT.code;
                this.listData = res.body.RESULT.data;
                this.listDate = this.listData[0];

                this.standardData();
            },
            () => {
                console.error();
            }
        );
    }

    public standardData(){
        const startDate = this.listDate[0][0];
        const endDate = this.listDate[this.listDate.length - 1][0];
        let flag = startDate;

        let sampleData = [];
        for (let index = 0; index < this.listDate.length; index++) {
            sampleData.push([this.listDate[index][0],0])
        }
        console.log(sampleData);
        console.log(this.listData[2]);


        for (let index = 1; index < this.listData.length; index++) {
            const listItem = this.listData[index];
            let list = [];

            for (let index2 = 0; index2 < sampleData.length; index++) {
                list.push(this.checkInclude(sampleData[index2][0],listItem))
            }
            this.listData[index] = list;
            
        }
        console.log(this.listData);
    }

    public checkInclude(num:Number,list:any):any{
        for (let index = 0; index < list.length; index++) {
            if(num === list[index][0]){
                return list[index];
            }
        }
        return [num,0];
    }

}
