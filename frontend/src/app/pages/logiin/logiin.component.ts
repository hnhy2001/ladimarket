import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logiin',
  templateUrl: './logiin.component.html',
  styleUrls: ['./logiin.component.scss']
})
export class LogiinComponent implements OnInit {

  @ViewChild('formLogin')
  formLogin!: NgForm;
  users: any;
  private router:Router;
  constructor(private userData: LoginService) {
    
    this.userData.users().subscribe((data) => {
      this.users = data;
    });
   }
  
  ngOnInit(): void {

  }
  onSubmit(data:any){
    console.warn(data);
    this.userData.saveUser(data).subscribe((result)=>{
      console.warn(result);
    });
    
    let count = 0;
    for ( let i=0; i<this.users.length;i++){
      if(data.username == this.users[i].username && data.password == this.users[i].password){
        count +=1;
      }
    }
    if(count!=0){
      alert("Đăng nhập thành công");
      this.router.navigate(['/']);
    }
    else{
      alert("Đăng nhập thất bại")
    }
  }
}

