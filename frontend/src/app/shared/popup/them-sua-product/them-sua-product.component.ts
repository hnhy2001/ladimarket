import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'app/notification.service';

@Component({
  selector: 'app-them-sua-product',
  templateUrl: './them-sua-product.component.html'
})
export class ThemSuaProductComponent implements OnInit {
  @Input() data?: any;
  @Input() shopcode?: any;
  @Input() title?: any;

  ma='';
  ten='';
  trangThai = 1;
  url = '';
  ghiChu = '';
  giaBan = 0;
  giaNhap = 0;

  REQUEST_URL = '/api/v1/product/'
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
      this.giaBan = this.data.giaBan;
      this.giaNhap = this.data.giaNhap;
      this.ghiChu = this.data.note;
      
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
        name: this.ten?this.ten.trim():'',
        status: 1,
        giaBan:this.giaBan,
        giaNhap:this.giaNhap,
        shopcode:this.shopcode,
        note : this.ghiChu
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
