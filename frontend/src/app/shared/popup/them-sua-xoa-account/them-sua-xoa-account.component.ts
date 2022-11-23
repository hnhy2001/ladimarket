import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'app/notification.service';

@Component({
  selector: 'app-them-sua-xoa-account',
  templateUrl: './them-sua-xoa-account.component.html',
  styleUrls: ['./them-sua-xoa-account.component.scss']
})
export class ThemSuaXoaAccountComponent implements OnInit {
  @Input() data?: any;
  @Input() id?: any;
  @Input() title?: any;

  @ViewChild('formLogin')
  formLogin!: NgForm;
  users: any;
  username = "";
  password = "";
  email = "";
  retypePassword = "";
  sdt = "";
  address = "";
  fullName = "";
  role="user";

  REQUEST_URL = '/api/v1/account'
  constructor(
    private activeModal: NgbActiveModal,
    private dmService: DanhMucService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.username = this.data.userName;
      this.fullName = this.data.fullName;
      this.email = this.data.email;
      this.sdt = this.data.phone;
      this.address = this.data.address;
      this.role = this.data.role;
    }
  }

  create() {
    if(this.validData()){
      let entity = {
        id: '',
        userName: this.username,
        passWord: this.password,
        email: this.email,
        phone: this.sdt,
        address : this.address,
        fullName: this.fullName,
        role: this.role
      }
      if(!this.data){
        this.dmService.postOption(entity, "/api/v1/account/create", '').subscribe(
          (res: HttpResponse<any>) => {
            if(res.body.CODE === 200){
              this.notification.showSuccess("Tạo account thành công", "Success");
              this.accept();
            }
            else{
              this.notification.showError("Tạo account thất bại", "Fail");
              this.dismiss();
            }
          },
          () => {
            console.error();
          }
        );
      }
      else{
        entity.id = this.data.id;
        this.dmService.putOption(entity, "/api/v1/account/update", '').subscribe(
          (res: HttpResponse<any>) => {
            if(res.body.CODE === 200){
              this.notification.showSuccess("Sửa thành công", "Success");
              this.accept();
            }
            else{
              this.notification.showError("Sửa thất bại", "Fail");
              this.dismiss();
            }
          },
          () => {
            console.error();
            
          }
        );
      }
    }
    
  }

  validData(){
    if(this.password !== this.retypePassword){
      alert("mat khau khong khop")
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
