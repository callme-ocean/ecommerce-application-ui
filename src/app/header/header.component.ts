import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = "default";
  sellerName: string = "";
  searchResult: undefined | Product[];

  constructor(private router: Router, private product: ProductService) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";

          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          this.menuType = "default";
        }
      }
    });
  }

  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {

        if (result.length > 5) {
          result.length = 5;
        }

        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(query: string) {
    this.router.navigate([`search/${query}`]);
  }

}
