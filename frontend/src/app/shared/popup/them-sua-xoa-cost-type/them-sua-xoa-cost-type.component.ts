import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'app/notification.service';

@Component({
  selector: 'app-them-sua-xoa-codetype',
  templateUrl: './them-sua-xoa-cost-type.component.html'
})
export class ThemSuaXoaCostTypeComponent implements OnInit {
  @Input() data?: any;
  @Input() id?: any;
  @Input() title?: any;

  code = '';
  name = '';
  priod =  1;
  status = 1;
  isCountOrder = 0;
  REQUEST_URL = '/api/v1/costtype';
  constructor(
    private activeModal: NgbActiveModal,
    private dmService: DanhMucService,
    private notification: NotificationService
  ) { 
    
  }

  ngOnInit(): void {
    if(this.data){
      this.code = this.data.code;
      this.name = this.data.name;
      this.status = this.data.status;
      this.priod = this.data.priod;
      this.isCountOrder = this.data.isCountOrder;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes){
      this.data = changes.data.currentValue;
      
    }
    
  }

  create() {
    if(this.validData()){
      let entity = {
        id : '',
        code : this.code,
        name : this.name,
        status : this.status,
        priod : Number(this.priod),
        isCountOrder : this.isCountOrder
      }
      if(!this.data){
          this.dmService.postOption(entity, "/api/v1/costtype/create", '').subscribe(
            (res: HttpResponse<any>) => {
              if(res.body.CODE === 200){
                this.notification.showSuccess("Tạo constType thành công", "Success");
                this.accept();
              }
              else{
                this.notification.showError("Tạo constType thất bại", "Fail");
                this.dismiss();
              }
            },
            () => {
              this.notification.showError("Tạo constType thất bại", "Fail");
              console.error();
            }
          );
      }
      else{
        entity.id = this.data.id;
        console.log(this.id);
          this.dmService.putOption(entity, "/api/v1/costtype/update", '').subscribe(
            (res: HttpResponse<any>) => {
              if(res.body.CODE === 200){
                this.notification.showSuccess("Cập nhật constType thành công", "Success");
                this.accept();
              }
              else{
                this.notification.showError("Cập nhật constType thất bại", "Fail");
                this.dismiss();
              }
            },
            () => {
              this.notification.showError("Cập nhật tài khoản thất bại", "Fail");
              console.error();
              
            }
          );
      }
    }
    
  }

  validData(){
    if(this.code == "" ){
      this.notification.showError("code Không được để trống", "Fail");
      return false;
    }

    if(this.name == "" ){
      this.notification.showError("name Không được để trống", "Fail");
      return false;
    }
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
