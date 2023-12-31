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
  trendyProducts: undefined | Product[];

  constructor(private product: ProductService) {

  }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((result) => {
      this.popularProducts = result;
    });

    this.product.trendyProducts().subscribe((result) => {
      this.trendyProducts = result;
    });
  }
}
