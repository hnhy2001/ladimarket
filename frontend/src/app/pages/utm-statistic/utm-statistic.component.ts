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
                this.listEntity = res.body.RESULT;
                
            },
            () => {
                console.error();
            }
        );
    }

}
