import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataProcessingServiceService } from '../data-processing-service.service';
import { ILogin } from '../interfaces/ILogin';
import { IPassword } from '../interfaces/IPassword';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  public forgotPassword: FormGroup;
  
  constructor(private fb:FormBuilder, private dps: DataProcessingServiceService) {   }

  public ngOnInit(): void {
    this.forgotPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      tempPassword: ['', [Validators.required , Validators.minLength(6)]],
      password : ['', [Validators.required , Validators.minLength(6)]]
   });
  }

  public validateEmail(): boolean {
    return (this.forgotPassword.controls["email"].dirty)?  this.forgotPassword.controls["email"].valid : true;
  }

  public validateTempPass(): boolean {
    return (this.forgotPassword.controls["tempPassword"].dirty)?  this.forgotPassword.controls["tempPassword"].valid: true;
  }

  public validatePassword(): boolean {
    return (this.forgotPassword.controls["password"].dirty)?  this.forgotPassword.controls["password"].valid: true;
  }

  public postForgotPassword() {
    let passwordData: IPassword = {
      email: this.forgotPassword.controls["email"].value,
      tempPassword: this.forgotPassword.controls["tempPassword"].value,
      updatedPassword: this.forgotPassword.controls["password"].value
    }
    this.dps.postForgotPasswordData(passwordData);
  }
}
