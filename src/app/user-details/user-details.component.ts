import { Component, DoCheck, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  usersDetails:any;
constructor(private userSer:UserDataService){}

  ngOnInit(){
   this.usersDetails=this.userSer.getUserData();
   console.log("userDetails",this.usersDetails)
  }
  deleteAddress(i:any){
  this.usersDetails.splice(i ,1)
  }
}
