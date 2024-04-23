import { Component } from '@angular/core';
import { IUser } from '../../models/iuser';
import * as jwt_decode from "jwt-decode";
import { UserRequestsService } from '../../services/user-requests.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    standalone: true,
    imports: [FormsModule, NgClass]
})
export class ProfileComponent {

  user : IUser = {} as IUser

  nameEditFlag : boolean = false
  emailEditFlag : boolean = false
  passwordEditFlag : boolean = false

  passwordCheckingFlag : boolean  = false
  passwordAuthFlag : boolean = false

  id : string = ""
  userName:string = ""
  userEmail:string = ""
  userPassword:string = ""

  repeatPassword : string = ""

  constructor(public userService : UserRequestsService , private router : Router  ,private route: ActivatedRoute, private adminAuth: AdminAuthService){}
  ngOnInit():void{
    let localS = this.adminAuth.getToken()
    console.log(localS);
    this.id = this.getDecodedAccessToken(localS).id
    this.userService.getOneUser(this.id).subscribe({
      next:(res) => {
        console.log(res);
        this.user = res
        this.userName = res.name
        this.userEmail = res.email
        this.userPassword = ""
        this.nameEditFlag =false;
        this.emailEditFlag =false;

        this.passwordEditFlag =false;
        this.passwordCheckingFlag =false;
        this.passwordAuthFlag =false;

      },
      error(err) {
        console.log(err);
      },
    })
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  editNameFlag(){
    this.nameEditFlag = !this.nameEditFlag
    if(!this.nameEditFlag){
      this.userName = this.user.name
    }
  }

  editEmailFlag(){
    this.emailEditFlag = !this.emailEditFlag
    if(!this.emailEditFlag){
      this.userEmail = this.user.email
    }

  }
  editPasswordFlag(){
    this.passwordEditFlag = !this.passwordEditFlag
  }

  editAdminName(){
    console.log(this.userName);

    this.userService.editOneUser( this.id , {"name" : this.userName}).subscribe({
      next:(data)=>{
        console.log(data);
        this.ngOnInit()
      },
      error(error){
        console.log(error);

      }
    })
  }
  editAdminEmail(){
    this.userService.editOneUser( this.id , {"email" : this.userEmail}).subscribe({
      next:(data)=>{
        console.log(data);
        this.ngOnInit()
      },
      error(error){
        console.log(error);

      }
    })
  }

  checkCurrnetPassword(){
    this.passwordCheckingFlag = !this.passwordCheckingFlag
    this.adminAuth.login(this.user.email ,this.userPassword).subscribe({
      next: (data) => {
        console.log(data);
        this.passwordCheckingFlag = !this.passwordCheckingFlag
        this.passwordAuthFlag = true;
        this.user.password = ""
      },
      error : (err) => {
        this.passwordAuthFlag = false;
        this.passwordCheckingFlag = false;
        this.userPassword = "";
        console.log(err);

      },
    })
  }
  editAdminPassword(){
    if(this.repeatPassword == this.user.password && this.repeatPassword !== ""){
      this.userService.editOneUser(this.id , {"password" : this.repeatPassword}).subscribe({
        next : (res) =>{
          console.log(res);
          this.ngOnInit()
        },
        error(err) {
          console.log(err);

        },
      })
    }

  }
}
