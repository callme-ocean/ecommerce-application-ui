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

  constructor(private seller: SellerService, private router: Router) {

  }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  singUp(data: SingUp): void {
    this.seller.userSignUp(data);
  }

  login(data: SingUp): void {
    console.warn(data);
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
