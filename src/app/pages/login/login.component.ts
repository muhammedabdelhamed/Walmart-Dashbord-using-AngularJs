import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../models/iuser';
import { AdminAuthService } from '../../services/admin-auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
    ],
})
export class LoginComponent {
  userLoginForm: FormGroup;
  user: IUser = {} as IUser;
  checked: boolean
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminAuth: AdminAuthService,
    public tost: NgToastService
  ) {
    this.userLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logCheck(e) {
    this.checked = e.target.checked
  }

  get email() {
    return this.userLoginForm.get('email');
  }
  get password() {
    return this.userLoginForm.get('password');
  }

  moveToRegister() {
    this.router.navigate(['/register']);
  }

  loginFunc() {
    console.log("Hello");
    const val = this.userLoginForm.value;
    if (val.email && val.password) {
      this.adminAuth.login(val.email, val.password).subscribe({
        next: (data) => {
          this.checked
          ? this.adminAuth.setCookie(data)
          : this.adminAuth.setSession(data);

          this.router.navigateByUrl('/');
        },
        error: (err)=>{
          this.tost.error({
            detail: 'Error',
            summary: err.error.message,
            duration: 5000,
          })
        }
      });
    }
  }
}
