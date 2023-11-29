import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  addressList: any = [];
  displayAddressList = false;
  userDetails: any = [];

  constructor(private fb: FormBuilder, private userSer: UserDataService) { }

  registrationForm = this.fb.group({
    name: new FormControl('Johndoe',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    address: this.fb.group({
      city: new FormControl('Bangalore',[Validators.required]),
      state: new FormControl('Karnataka',[Validators.required]),
      pincode: new FormControl('12345',[Validators.required])
    }),
  });

  get address(){
    return this.registrationForm.controls['address']
  }
  get name(){
    return this.registrationForm.get('name')
  }
  get email(){
    return this.registrationForm.get('email')
  }
  get city(){
//console.log("city",this.registrationForm.get('address')?.get('city')?.value)
    return this.registrationForm.get('address')?.get('city')
  }
  get state(){
    return this.registrationForm.get('address')?.get('state')
  }
  get pincode(){
    return this.registrationForm.get('address')?.get('pincode')
  }

  addAdress() {
    this.addressList.push(this.registrationForm.value.address)
    this.displayAddressList = true
     console.log("Addresslist",this.addressList)
   // reset fields click of addAddress
    this.getFormControl('address.city')?.setValue(null);
    this.getFormControl('address.state')?.setValue(null);
    this.getFormControl('address.pincode')?.setValue(null);
    this.userSer.userData = this.addressList;
  }

  registerUser() {
    this.userDetails.push({
      Name: this.registrationForm?.value?.name,
      Email: this.registrationForm.value.email,
      Address: this.addressList ? this.addressList : this.addressList.push(this.registrationForm.value.address)
    });
    this.addressList.push(this.registrationForm.value.address)
    console.log("Registration Forms123: ", this.userDetails);
    console.log("Addred address: ", this.addressList);
    this.userSer.sendUserDetails(this.userDetails);
    this.addressList=[];
  }

  public getFormControl(data: string): FormControl {
    return this.registrationForm.get(data) as FormControl;
  }
  deteleAddress(indexOfAddress: any) {
    this.addressList.splice(indexOfAddress, 1);
  }
}