import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderData: Order[] | undefined;

  constructor(private product: ProductService) { }

  ngOnInit() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
