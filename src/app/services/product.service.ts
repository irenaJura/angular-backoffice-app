import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';

const baseUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getStore(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${baseUrl}/products`);
  }

  getProduct(productId: number): Observable<any> {
    return this.http.get(`${baseUrl}/products/${productId}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(`${baseUrl}/products`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${baseUrl}/products/${productId}`);
  }
}
