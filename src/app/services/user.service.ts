import { EventEmitter, Injectable } from '@angular/core';
import { Login, SingUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SingUp) {
    this.http.post("http://localhost:3000/users", user, { observe: 'response' }).subscribe((result) => {

      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }

    });
  }

  userLogin(user: Login) {
    this.http.get<SingUp[]>(`http://localhost:3000/users?email=${user.email}&password=${user.password}`, { observe: 'response' }).subscribe((result) => {
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
