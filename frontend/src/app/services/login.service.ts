import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url="http://localhost:3000/posts";
  
  constructor(private http:HttpClient) { }

  users(){
    return this.http.get(this.url);
  }
  saveUser(data:any){
    return this.http.post(this.url,data);
  }
}
