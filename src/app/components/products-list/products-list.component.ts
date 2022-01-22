import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  title = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getStore();
    this.getProducts();
  }

  getStore(): void {
    this.productService.getStore()
      .subscribe(
        data => {
          this.title = data.name;
          console.log(data.name);
        },
        error => {
          console.log(error);
        });
  }

  getProducts(): void {
    this.productService.getAllProducts()
      .subscribe(
        data => {
          this.products = data;
          console.log(this.products);
        },
        error => {
          console.log(error);
        }
      )
  }


}
