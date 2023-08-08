import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart: boolean = false;

  constructor(private activateRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit() {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId === item.id.toString());

        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');

      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: Product) => productId?.toString() === item.productId?.toString());

          if (item.length) {
            this.removeCart = true;
          }
        });


      }
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
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;

        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeFromCart(productId: number) {
    this.product.removeItemFromCart(productId);
    this.removeCart = false;
  }
}
