import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('formLogin')
  formLogin!: NgForm;
  users: any;
  constructor(private userData: LoginService) {
    this.userData.users().subscribe((data) => {
      this.users = data;
    });
   }
  
  ngOnInit(): void {

  }
  onSubmit(data:any){
    if(data.username=="" || data.password==""){
      alert("Đăng ký thất bại");
    }
    else{
      console.warn(data);
      this.userData.saveUser(data).subscribe((result)=>{
      alert("Đăng ký thành công");
    });
    } 
  }
}
