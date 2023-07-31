import { Component } from '@angular/core';
import { Cart, Login, Product, SingUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authError: string = "";

  constructor(private user: UserService, private product: ProductService) { }

  ngOnInit() {
    this.user.userAuthReload();
  }

  signUp(data: SingUp) {
    this.user.userSignUp(data);
  }

  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid user details";
      } else {
        setTimeout(() => {
          this.localCartToRemoteCart();
        }, 300);
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');

    if (data) {
      let cartDataList: Product[] = JSON.parse(data);
      let userData = localStorage.getItem('user');
      let userId = userData && JSON.parse(userData).id;

      cartDataList.forEach((product: Product, index: number) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;

        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("Item stored in DB");
            }
          });

          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);

      });
    }
  }
}
