import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ILogin } from '../interfaces/ILogin';
import { DataProcessingServiceService } from '../data-processing-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public loginForm: FormGroup;
  
  constructor(private fb:FormBuilder, private dps: DataProcessingServiceService, private router : Router) {   }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required , Validators.minLength(6)]]
   });
  }

  public validateEmail(): boolean {
    return (this.loginForm.controls["email"].dirty)?  this.loginForm.controls["email"].valid : true;
  }

  public validatePassword(): boolean {
    return (this.loginForm.controls["password"].dirty)?  this.loginForm.controls["password"].valid: true;
  }

  public postLogin() {
    let loginData: ILogin = {
      email: this.loginForm.controls["email"].value,
      password: this.loginForm.controls["password"].value
    }
    this.dps.postLoginData(loginData);
  }

  public forgot(): void{
    this.router.navigate(['/forgotPassword']);
  }
}
