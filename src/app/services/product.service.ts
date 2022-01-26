import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../classes/product';

const baseUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getStore(): Observable<any> {
    return this.http.get(baseUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${baseUrl}/products`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getProduct(productId: number): Observable<any> {
    return this.http.get(`${baseUrl}/products/${productId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(`${baseUrl}/products`, product)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${baseUrl}/products/${productId}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCategories(): Observable<any> {
    return this.http.get(`${baseUrl}/stats/categories`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
