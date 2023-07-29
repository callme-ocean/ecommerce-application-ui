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
    console.warn(productId);
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
            alert("Product is added in cart");
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
