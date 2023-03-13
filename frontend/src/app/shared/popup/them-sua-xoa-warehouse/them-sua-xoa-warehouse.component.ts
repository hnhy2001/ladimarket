import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'app/notification.service';

@Component({
  selector: 'app-them-sua-xoa-warehouse',
  templateUrl: './them-sua-xoa-warehouse.component.html'
})
export class ThemSuaXoaWarehouseComponent implements OnInit {
  @Input() data?: any;
  @Input() id?: any;
  @Input() title?: any;

  @ViewChild('formLogin')
  formLogin!: NgForm;
  code : any;
  name : any;
  address: any;
  configShop: any;
  phoneNumber : any;
  REQUEST_URL = '/api/v1/warehouse';
  constructor(
    private activeModal: NgbActiveModal,
    private dmService: DanhMucService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.code = this.data.code,
    this.name = this.data.name,
    this.address = this.data.address,
    this.configShop = this.data.configShop,
    this.phoneNumber = this.data.phoneNumber
  }

  create() {
    if(this.validData()){
      let entity = {
        id: '',
        code : this.code,
        name : this.name,
        address: this.address,
        configShop : this.configShop,
        phoneNumber : this.phoneNumber
      }
      if(!this.data){
          this.dmService.postOption(entity, this.REQUEST_URL, "/create").subscribe(
            (res: HttpResponse<any>) => {
              if(res.body.CODE === 200){
                this.notification.showSuccess("Tạo kho thành công", "Success");
                this.accept();
              }
              else{
                this.notification.showError("Tạo kho thất bại", "Fail");
                this.dismiss();
              }
            },
            () => {
              this.notification.showError("Tạo kho thất bại", "Fail");
              console.error();
            }
          );
        }
      else{
        entity.id = this.data.id;
          this.dmService.putOption(entity, this.REQUEST_URL, '/update').subscribe(
            (res: HttpResponse<any>) => {
              if(res.body.CODE === 200){
                this.notification.showSuccess("Cập nhật kho thành công", "Success");
                this.accept();
              }
              else{
                this.notification.showError("Cập nhật kho thất bại", "Fail");
                this.dismiss();
              }
            },
            () => {
              this.notification.showError("Cập nhật kho thất bại", "Fail");
              console.error();
              
            }
          );
        }
      }
    
  }

  validData(){
    return true;
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
