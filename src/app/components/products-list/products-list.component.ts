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
  breakpoint = 1;
  visible = false;
  visibleIndex = -1;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getStore();
    this.getProducts();
    this.breakpoint = (window.innerWidth <= 1000) ? 2 : 3;
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
          console.log("got products", this.products);
        },
        error => {
          console.log(error);
        }
      )
  }

  deleteProduct(id: number): void {
    window.alert("Are you sure you want to delete this product?")
    this.productService.deleteProduct(id)
      .subscribe(
        response => {
          console.log("delete", response);
          this.getProducts();
        },
        error => {
          console.log(error);
        });
  }

  toggleReviews(id: number) {
    if (this.visibleIndex === id) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = id;
    }
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 2;
  }

}
