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
  REQUEST_URL ="/api/v1/work";
  @Input() data: any;
  listUser = [];


  constructor(private activeModal: NgbActiveModal,
    private service: DanhMucService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getUserActive();
    console.log(this.listUser);
  }

  ngOnDestroy(): void {
  }

  public getUserActive() {
    this.service.getOption(null, this.REQUEST_URL,"/getAllActive").subscribe(
        (res: HttpResponse<any>) => {
          setTimeout(() => {
            this.listUser.push(res.body.RESULT);
          }, 100);
        },
        (error: any) => {
          this.notificationService.showError(`${error.body.RESULT.message}`,"Thông báo lỗi!");
        }
    );

  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }

}
