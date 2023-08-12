import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SingUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SingUp) {
    this.http.post(`${this.apiServerUrl}/seller`, data, { observe: 'response' }).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
    });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    console.warn(data);
    this.http.get(`${this.apiServerUrl}/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      console.warn(result);

      if (result && result.body && result.body.length) {
        console.warn("user logged in");
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      } else {
        console.warn("loggin failed");
        this.isLoginError.emit(true);
      }
    });
  }
}
