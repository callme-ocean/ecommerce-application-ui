import { EventEmitter, Injectable } from '@angular/core';
import { Login, SingUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SingUp) {
    this.http.post(`${this.apiServerUrl}/users`, user, { observe: 'response' }).subscribe((result) => {

      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }

    });
  }

  userLogin(user: Login) {
    this.http.get<SingUp[]>(`${this.apiServerUrl}/users?email=${user.email}&password=${user.password}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body?.length) {
        this.invalidUserAuth.emit(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      } else {
        this.invalidUserAuth.emit(true);
      }
    });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
