import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: undefined | Product;
  productQuantity: number = 1;

  constructor(private activateRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit() {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;
    });
  }

  handleQuantity(quantity: string) {
    if (this.productQuantity < 20 && quantity === "plus") {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && quantity === "min") {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        console.warn("user not logged in");
        this.product.localAddToCart(this.productData);
      } 
      // else {
      //   console.warn("user logged in");
      // }
    }
  }
}
