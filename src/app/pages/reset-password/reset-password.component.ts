import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  displayForm: String = "mail"
  get email() {
    return this.resetPasswordForm.get('email');
  }
  get code() {
    return this.resetPasswordForm.get('code');
  }
  get password() {
    return this.resetPasswordForm.get('password');
  }
  get conPassword() {
    return this.resetPasswordForm.get('conPassword');
  }
  constructor(private formBuilder: FormBuilder,
    private router: Router, private adminAuth: AdminAuthService, public tost: NgToastService){
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      password: ['', [Validators.required]],
      conPassword: ['', [Validators.required]],
    });
  }
  goEnterEmail(){
    
  }
  sendCode(){
    this.adminAuth.sendCode(this.email.value).subscribe({
      next: (data)=>{
        this.displayForm = "code"
      },
      error: (err)=>{
        // console.log(err);
      }
    })
  }
  verifyCode(){
    this.adminAuth.verifyCode(this.code.value).subscribe({
      next: (data)=>{
        this.displayForm = "password"
      },
      error: (err)=>{
        // console.log(err);
      }
    })
  }
  resetPassword(){
    
    this.adminAuth.resetPassword({ password:this.password.value , confirmPassword: this.conPassword.value }, this.code.value).subscribe({
      next: (data)=>{
          this.tost.success({
            detail: 'Succeeded',
            summary: "Password has been changed",
            duration: 5000,
          });
        this.displayForm = "mail"
        this.router.navigateByUrl("/")
      },
      error: (err)=>{
        if(err.error.message !== "Password and confirm password are required"){
        this.tost.error({
          detail: 'Error',
          summary: err.error.message,
          duration: 5000,
        });}
      }
    })
  }
}
