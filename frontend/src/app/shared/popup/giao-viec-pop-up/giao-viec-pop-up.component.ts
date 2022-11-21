import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { NotificationService } from 'app/notification.service';

@Component({
  selector: 'app-giao-viec-pop-up',
  templateUrl: './giao-viec-pop-up.component.html',
  styleUrls: ['./giao-viec-pop-up.component.scss']
})

export class GiaoViecPopUpComponent implements OnInit, OnDestroy {
  REQUEST_WORK_URL ="/api/v1/work";
  @Input() data: any;
  listUser:any = [];
  staffId:number = 0;
  REQUEST_DATA_URL ="/api/v1/data";

  constructor(private activeModal: NgbActiveModal,
    private service: DanhMucService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getUserActive();
    console.log(this.listUser);
  }

  ngOnDestroy(): void {
  }

  public getUserActive() {
    this.service.getOption(null, this.REQUEST_WORK_URL,"/getAllActive").subscribe(
        (res: HttpResponse<any>) => {
          this.listUser.push(res.body.RESULT);
        },
        (error: any) => {
          this.notificationService.showError(`${error.body.RESULT.message}`,"Thông báo lỗi!");
        }
    );
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }

  public setStaffId(staffId: any) {
    if(staffId != 0 || staffId != undefined)
      this.staffId = staffId;
  }

  public assignWork():void {
    //this.staffId
    // if(this.staffId <=0 || this.staffId == undefined) {
    //   this.notificationService.showError(`${'Vui lòng chọn nhân sự'}`,"Thông báo lỗi!");
    // }

    let obj  = {
      staffId: 1,
      data: this.data
    }

    this.service.postOption(obj, this.REQUEST_DATA_URL, "/assignWork").subscribe(
      (res: HttpResponse<any>) => {
        this.notificationService.showSuccess(`${res.body.RESULT.message}`,"Thông báo!");
      },
      (error: any) => {
        this.notificationService.showError(`${error.body.RESULT.message}`,"Thông báo lỗi!");
      }
    );
  }
}
