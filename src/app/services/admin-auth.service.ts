import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  retry,
  throwError,
} from 'rxjs';
import { IUser } from '../models/iuser';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  userLoggedBehavior: BehaviorSubject<boolean>;
  httpHeader = {};

  constructor(private httpClient: HttpClient, private router: Router) {
    this.userLoggedBehavior = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  login(email, password): Observable<object> {
    return this.httpClient
      .post<IUser>(
        `${environment.BAseApiURL}/users/signin`,
        { email, password },
        // user,
        this.httpHeader
      )
      .pipe(
        retry(3),
        // catchError((err) => {
        //   return throwError(() => {
        //     this.userLoggedBehavior.next(true);
        //     return new Error('Error While Adding user');
        //   });
        // })
      );
  }
  setSession(authResult) {
    sessionStorage.setItem('token', authResult.token);
  }
  setCookie(authResult) {
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + authResult.expires_at);
    document.cookie = `token=${authResult.token};expires=${expiryDate}`;
  }
  logout() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    // case remember me
    document.cookie = `token=null;expires=${date}`;
    // normal case
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  get isUserLogged(): boolean {
    let token = this.getToken();
    return token ? true : false;
  }
  getToken() {
    const sessionToken = sessionStorage.getItem('token');
    let cookies = document.cookie.split(/[;=]/);
    let cookiesToken =
      cookies.indexOf('token') !== -1
        ? cookies[cookies.indexOf('token') + 1]
        : null;
    return sessionToken ? sessionToken : cookiesToken;
  }
  sendCode(email) {
    return this.httpClient.post(
      `${environment.BAseApiURL}/emailRecovery`,
      { email }
    )
    .pipe(
      retry(3)
    )
  }
  verifyCode(enteredCode) {
    return this.httpClient.post(
      `${environment.BAseApiURL}/resetCode`,
      { enteredCode }
    )
    .pipe(
      retry(3)
    )
  }
  resetPassword(userPassword, enteredCode) {
    return this.httpClient.patch(
      `${environment.BAseApiURL}/resetPassword`,
      { userPassword, enteredCode }
    )
    .pipe(
      retry(3)
    )
  }
}
