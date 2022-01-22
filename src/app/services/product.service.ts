import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';

const baseUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getProduct(storeId: number, productId: number): Observable<any> {
    return this.http.get(`${baseUrl}/${storeId}/products/${productId}`);
  }

  addProduct(storeId: number, product: Product): Observable<any> {
    return this.http.post(`${baseUrl}/${storeId}/products`, product);
  }

  deleteProduct(storeId: number, productId: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${storeId}/products/${productId}`);
  }
}
