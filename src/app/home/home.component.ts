import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProducts: undefined | Product[];

  constructor(private product: ProductService) {

  }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((result) => {
      console.warn(result);
      this.popularProducts = result;
    });
  }
}
