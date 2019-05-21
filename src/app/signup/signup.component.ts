import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IRegister } from '../interfaces/IRegister';
import { DataProcessingServiceService } from '../data-processing-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public registerForm :FormGroup;

  constructor(private fb: FormBuilder, private dps: DataProcessingServiceService) { }

  public ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required , Validators.minLength(6)]],
      validatePassword:['',[Validators.required , Validators.minLength(6)]]
    });
  }

  public validateEmail():boolean {
    return (this.registerForm.controls["email"].touched)? this.registerForm.controls["email"].valid : true;
  }
  
  public validatePassword(): boolean{
    return (this.registerForm.controls["password"].touched)?  this.registerForm.controls["password"].valid: true;
  }

  public validateRepeatPassword(): boolean{
    if(this.registerForm.controls["validatePassword"].touched){
      let pass = this.registerForm.controls["password"].value;
      let confirmPass = this.registerForm.controls["validatePassword"].value;
      if (pass === confirmPass) {
        return true;
      }
      return false;
      }
    return true;
  }

  public validateFName(): boolean{
    return (this.registerForm.controls["firstName"].touched)?  this.registerForm.controls["firstName"].valid: true;
  }

  public validateLName(): boolean{
    return (this.registerForm.controls["lastName"].touched)?  this.registerForm.controls["lastName"].valid: true;
  }
  
  public postRegister(): void {
    let registerData : IRegister = {
      firstName : this.registerForm.controls["firstName"].value,
      lastName : this.registerForm.controls["lastName"].value ,
      email : this.registerForm.controls["email"].value,
      password : this.registerForm.controls["password"].value,
      validatePassword : this.registerForm.controls["validatePassword"].value,
    }
    this.dps.postRegisterData(registerData);
  }
}
