import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { NotificationService } from 'app/notification.service';
import DateUtil from 'app/shared/util/date.util';
import moment from 'moment';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckOutComponent implements OnInit {
  checkOut= moment(new Date()).format('YYYYMMDDHHmmss');
  data:any = {};
  REQUEST_URL = '/api/v1/work/infoCheckout'
  constructor(private activeModal: NgbActiveModal,private dmService: DanhMucService,private localStorage: LocalStorageService,private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo():void{
    const token = this.localStorage.retrieve('authenticationtoken');
    this.dmService.postOption({ nhanVienId:token.id }, "/api/v1/work/checkWorkActive", '').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.CODE === 200) {
          this.data = res.body.RESULT;
          if(this.data){
            this.data.timeIn = this.data.timeIn? DateUtil.formatDate(this.data.timeIn):null;
            this.checkOut = this.checkOut? DateUtil.formatDate(this.checkOut):null;
          }
        }
      },
      () => {
        this.notificationService.showError('Đã có lỗi xảy ra',"Thông báo lỗi!");
      }
    );
    // this.dmService.postOption(null,this.REQUEST_URL, "?id=" + token.id).subscribe(
    //   (res: HttpResponse<any>) => {
    //     this.data = this.customDate(res.body.RESULT);
    //   },
    //   (error: any) => {
    //     this.notificationService.showError('Đã có lỗi xảy ra',"Thông báo lỗi!");
    //   }
    // );
  }
  doCheckOut() {
    let time = moment(new Date).format('YYYYMMDDHHmmss');
    let checkOutEntity = {
      id: this.data.id,
      timeOut: time,
      donGiao : this.data.donGiao,
      donHoanThanh : this.data.donHoanThanh,
      donXuLy:this.data.donXuLy,
      donThanhCong:this.data.donThanhCong
    };

    this.dmService.postOption(checkOutEntity, "/api/v1/work/checkOut/", '').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.CODE === 200) {
          this.notificationService.showSuccess("Check Out thành công",'Thông báo!');
          this.activeModal.close(true);
        } else {
          this.notificationService.showError("Đã có lỗi xảy ra",'Thông báo!');
        }
      },
      () => {
        console.error();
      }
    );

  }

  save():void{
    this.doCheckOut();
  }

  public dismiss(): void {
    this.activeModal.close(false);
  }
}
