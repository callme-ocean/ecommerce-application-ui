import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice: number | undefined;

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;

      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price) * item.quantity;
        }
      });

      this.totalPrice = price - (price / 20) + (price / 40) + 60;
      console.warn(this.totalPrice);
    });

  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId
      }

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          alert('Order Placed');
        }
      });
    }

    console.warn(data);
  }
}
