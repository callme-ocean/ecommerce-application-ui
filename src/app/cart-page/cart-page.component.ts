import { Component } from '@angular/core';
import { Cart, PriceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData: Cart[] | undefined;
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private product: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {

        if (item.quantity) {
          price = price + (+item.price) * item.quantity;
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 20;
      this.priceSummary.tax = price / 40;
      this.priceSummary.delivery = 60;
      this.priceSummary.total = this.priceSummary.price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.delivery;

      // rounding off price
      this.priceSummary.total = this.product.customRound(this.priceSummary.total);

      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }

    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  removeFromCart(cartId: number | undefined) {
    cartId && this.product.removeFromCart(cartId).subscribe((result) => {
      this.loadDetails();
    });

    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    this.product.getCartList(userId);
  }
}
