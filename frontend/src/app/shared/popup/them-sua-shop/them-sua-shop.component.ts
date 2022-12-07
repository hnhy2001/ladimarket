import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'app/notification.service';

@Component({
  selector: 'app-them-sua-shop',
  templateUrl: './them-sua-shop.component.html'
})
export class ThemSuaShopComponent implements OnInit {
  @Input() data?: any;
  @Input() title?: any;

  ma='';
  ten='';
  trangThai = 1;
  url = '';
  ghiChu = '';

  REQUEST_URL = '/api/v1/shop/'
  constructor(
    private activeModal: NgbActiveModal,
    private dmService: DanhMucService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.ma = this.data.code;
      this.ten = this.data.name;
      this.trangThai = this.data.status;
      this.url = this.data.url;
      this.ghiChu = this.data.note;
    }
  }

  create() {
    if(!this.ma.trim()){
        this.notification.showError("Mã không được để trống", "Fail");
        return;
    }
    if(this.ma.trim().length < 5){
      this.notification.showError("Mã phải có ít nhất 5 ký tự", "Fail");
        return;
    }
    if(!this.ten.trim()){
        this.notification.showError("Tên không được để trống", "Fail");
        return;
    }
      const entity = {
        id: this.data?this.data.id:0,
        code: this.ma?this.ma.trim().toUpperCase():'',
        name: this.ten?this.ten.trim():'',
        status: this.trangThai,
        url: this.url,
        note : this.ghiChu
      }
      if(!this.data){
        delete entity.id;
        this.dmService.postOption(entity, this.REQUEST_URL, 'create').subscribe(
          (res: HttpResponse<any>) => {
            if(res.body.CODE === 200){
              this.notification.showSuccess("Tạo shop thành công", "Success");
              this.accept();
            }
            else{
              this.notification.showError("Tạo shop thất bại", "Fail");
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
