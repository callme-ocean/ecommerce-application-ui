import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<Product[] | []>();
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    return this.http.post(`${this.apiServerUrl}/products`, data);
  }

  productList() {
    return this.http.get<Product[]>(`${this.apiServerUrl}/products`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiServerUrl}/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiServerUrl}/products/${id}`);
  }

  updateProduct(data: Product) {
    return this.http.put<Product>(`${this.apiServerUrl}/products/${data.id}`, data);
  }

  popularProducts() {
    return this.http.get<Product[]>(`${this.apiServerUrl}/products?_limit=4`);
  }

  trendyProducts() {
    return this.http.get<Product[]>(`${this.apiServerUrl}/products?_limit=10`);
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(`${this.apiServerUrl}/products?q=${query}`);
  }

  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');

    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post(`${this.apiServerUrl}/cart`, cartData);
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  getCartList(userId: number) {
    return this.http.get<Product[]>(`${this.apiServerUrl}/cart?userId=` + userId, { observe: 'response' }).subscribe((result) => {

      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
  }

  removeFromCart(cartId: number) {
    return this.http.delete(`${this.apiServerUrl}/cart/` + cartId);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(`${this.apiServerUrl}/cart?userId=` + userData.id);
  }

  orderNow(data: Order) {
    return this.http.post(`${this.apiServerUrl}/orders`, data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>(`${this.apiServerUrl}/orders?userId=` + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(`${this.apiServerUrl}/cart/` + cartId, { observe: 'response' }).subscribe((result) => {
      if (result) {
        this.cartData.emit([]);
      }
    });
  }

  cancelOrder(orderId: number) {
    return this.http.delete(`${this.apiServerUrl}/orders/` + orderId);
  }

  customRound(number: number): number {
    const integerPart = Math.floor(number);
    const decimalPart = number - integerPart;
  
    if (decimalPart < 0.5) {
      return integerPart;
    } else {
      return integerPart + 1;
    }
  }

}
