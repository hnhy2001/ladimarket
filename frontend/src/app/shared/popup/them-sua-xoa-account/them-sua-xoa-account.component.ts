import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucService } from 'app/danhmuc.service';
import { HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-them-sua-xoa-account',
  templateUrl: './them-sua-xoa-account.component.html',
  styleUrls: ['./them-sua-xoa-account.component.scss']
})
export class ThemSuaXoaAccountComponent implements OnInit {
  @Input() data?: any;
  @Input() id?:any;
  @Input() title?:any;
  
  @ViewChild('formLogin')
  formLogin!: NgForm;
  users: any;
  username="";
  password="";
  email="";
  retypePassword ="";
  sdt="";
  address="";
  REQUEST_URL = '/api/v1/account'
  constructor(
    private activeModal: NgbActiveModal,
    private dmService: DanhMucService 
    ) {}

  ngOnInit(): void {
    
  }

  onGiveShip():void{
    window.open("#/bill?id=" + this.data.id)
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
  create(){
    const entity = {
      userName : this.username,
      passWord : this.password,
      pass : this.retypePassword,
      email : this.email,
      phone : this.sdt,
      address : this.address
    }
    this.dmService.create(entity,this.REQUEST_URL).subscribe(
      (res:HttpResponse<any>)=>{
        this.activeModal.close(true);
      });
  }
}
