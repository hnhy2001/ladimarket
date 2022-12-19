import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'app/notification.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-them-sua-utm',
  templateUrl: './them-sua-utm.component.html'
})
export class ThemSuaUtmComponent implements OnInit {
  @Input() data?: any;
  @Input() shopcode?: any;
  @Input() title?: any;

  ma='';
  ten='';
  ghiChu = '';
  nhanvienid = '';

  REQUEST_URL = '/api/v1/utmmedium/'
  constructor(
    private activeModal: NgbActiveModal,
    private dmService: DanhMucService,
    private notification: NotificationService,
    private localService: LocalStorageService
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.ma = this.data.code;
      this.ghiChu = this.data.note;
      this.ten = this.data.account? this.data.account.fullName + " (" + this.data.account.userName + ")" : ''; 
      this.nhanvienid = this.data.account.id;
    }
    else {
      const info = this.localService.retrieve('authenticationtoken');
      this.ten = info? info.fullName + " (" + info.userName + ")" : '';
      this.nhanvienid = info?info.id : '';
    }
  }

  create() {
    if(!this.ma.trim()){
        this.notification.showError("Mã không được để trống", "Fail");
        return;
    }
    if(!this.ten.trim()){
        this.notification.showError("Tên không được để trống", "Fail");
        return;
    }
      const entity = {
        id: this.data?this.data.id:0,
        code: this.ma?this.ma.trim().toUpperCase():'',
        note : this.ghiChu,
        account: {id:this.nhanvienid}
      }
      if(!this.data){
        delete entity.id;
        this.dmService.postOption(entity, this.REQUEST_URL, 'create').subscribe(
          (res: HttpResponse<any>) => {
            if(res.body.CODE === 200){
              this.notification.showSuccess("Tạo sản phẩm thành công", "Success");
              this.accept();
            }
            else{
              this.notification.showError("Tạo sản phẩm thất bại", "Fail");
              this.dismiss();
            }
          },
          () => {
            this.notification.showError("Tạo shop thất bại", "Fail");
            console.error();
          }
        );
      }
      else{
        this.dmService.putOption(entity, this.REQUEST_URL, 'update').subscribe(
          (res: HttpResponse<any>) => {
            if(res.body.CODE === 200){
              this.notification.showSuccess("Cập nhật shop thành công", "Success");
              this.accept();
            }
            else{
              this.notification.showError("Cập nhật shop thất bại", "Fail");
              this.dismiss();
            }
          },
          () => {
            this.notification.showError("Cập nhật shop thất bại", "Fail");
            console.error();
            
          }
        );
      }
    }
    

  public decline(): void {
    this.activeModal.close(false);
  }

  public accept(): void {
    this.activeModal.close(true);
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }
}
