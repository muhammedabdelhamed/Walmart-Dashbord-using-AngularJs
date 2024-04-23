import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductRequestsService {
  httpheader = {};
  constructor(private httpClient: HttpClient) {
    this.httpheader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  //=========================< Get All Products For Charts >=================================
  getAllProducts(): Observable<{
    results: number;
    data: object[];
    page: number;
  }> {
    return this.httpClient.get<{
      results: number;
      data: object[];
      page: number;
    }>(`${environment.BAseApiURL}/product?limit=1000000000000`);
  }
  //=========================< Get top Products For Charts >=================================
  getTopProducts(): Observable<{
    results: number;
    data: object[];
    page: number;
  }> {
    return this.httpClient.get<{
      results: number;
      data: object[];
      page: number;
    }>(`${environment.BAseApiURL}/product?limit=7&sort=-boughtUnits`); //for now
  }
  //=========================< Get Product count peryear For Charts >=================================
  getProductCountPerYear(): Observable<{
    result: [{ count: number; year: number; month: number }];
    productCount: number;
  }> {
    return this.httpClient.get<{
      result: [{ count: number; year: number; month: number }];
      productCount: number;
    }>(`${environment.BAseApiURL}/product/perMonth`); //for now
  }
  //=========================< Get Product by id for charts >=================================
  getProductById(id: string): Observable<Object> {
    return this.httpClient.get<Object>(
      `${environment.BAseApiURL}/product/${id}`
    );
  }
  //======================< Get All Products >=================================================
  getProducts(page: number = 1, limit: number = 10): Observable<Products[]> {
    const params = { page: page.toString(), limit: limit.toString() };
    return this.httpClient.get<Products[]>(
      `${environment.BAseApiURL}/product`,
      { params }
    );
  }
  //======================< Get Product By Id >================================================
  GetProductById(prdId: string | undefined): Observable<Products> {
    return this.httpClient.get<Products>(
      `${environment.BAseApiURL}/product/${prdId}`
    );
  }
  //===================< upload imag >============================================================
  uploadImage(vals): Observable<any> {
    let data = vals;
    return this.httpClient.post(
      'https://api.cloudinary.com/v1_1/doksixv16/image/upload',
      data
    );
  }
  //======================< Creat new Product >================================================
  insertNewProduct(product: Products): Observable<Products> {
    return this.httpClient
      .post<Products>(
        `${environment.BAseApiURL}/product`,
        JSON.stringify(product),
        this.httpheader
      )
      .pipe(
        retry(3),
        catchError((err) => {
          console.error('HTTP request failed:', err);
          return throwError(() => {
            return new Error(err);
          });
        })
      );
  }
  //=======================< delet products >==============================================
  deletProduct(id: string | undefined) {
    var product = `${environment.BAseApiURL}/product/${id}`;
    return this.httpClient.delete(product);
  }
  //==================< update product >====================================================
  updateProduct(productId: string, product: Products): Observable<Products> {
    return this.httpClient
      .patch<Products>(
        `${environment.BAseApiURL}/product/${productId}`,
        JSON.stringify(product),
        this.httpheader
      )
      .pipe(
        retry(3),
        catchError((err) => {
          return throwError(() => {
            return new Error(err);
          });
        })
      );
  }
}
