import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SingUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showLogin: boolean = false;
  authError: string = "";

  constructor(private seller: SellerService, private router: Router) {

  }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  singUp(data: SingUp): void {
    this.seller.userSignUp(data);
  }

  login(data: SingUp): void {
    this.authError = "";

    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {

      if (isError) {
        this.authError = "Email or password is not correct";
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
