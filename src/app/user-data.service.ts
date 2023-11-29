import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
userData:any;
  constructor(private http:HttpClient) { }
getUserData(){
  return this.userData
}
sendUserDetails(userData:any){
this.userData=userData;
}
}