import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  productMessage: undefined | string;
  icon=faTrash;

  constructor(private product: ProductService) {

  }

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    console.warn("test id", id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product is deleted";
        this.list();
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    });
  }
}
