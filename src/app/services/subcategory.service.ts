import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Subcategory } from '../models/subcategory';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  httpHeaders = {};
  constructor(public httpClient: HttpClient) {
    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  //=================< Get All Subcategory >================================================
  getAllSubCategories(): Observable<Subcategory[]> {
    return this.httpClient.get<Subcategory[]>(
      `${environment.BAseApiURL}/subCategories?limit=99999999`
    );
  }
  //=================< Delete subcategory >=================================================
  deletSubCategory(_id: string | undefined) {
    var subcategory = `${environment.BAseApiURL}/subCategories/${_id}`;
    return this.httpClient.delete(subcategory);
  }
  //===================< upload imag >============================================================
  uploadImage(vals): Observable<any> {
    let data = vals;
    return this.httpClient.post(
      'https://api.cloudinary.com/v1_1/doksixv16/image/upload',
      data
    );
  }
  //================< Creat New subCategory >==================================================
  insertNewSubCategory(Subcategory: Subcategory): Observable<Subcategory> {
    return this.httpClient
      .post<Subcategory>(
        `${environment.BAseApiURL}/subcategories`,
        JSON.stringify(Subcategory),
        this.httpHeaders
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
  //==================< get subcategory by id >=================================================
  getSubCategoryById(subCatId: string | undefined): Observable<Subcategory> {
    return this.httpClient.get<Subcategory>(
      `${environment.BAseApiURL}/subcategories/${subCatId}`
    );
  }
  //==================< update subcategory >====================================================
  updateSubCtegory(
    subCatId: string,
    subCategory: Subcategory
  ): Observable<Subcategory> {
    return this.httpClient
      .patch<Subcategory>(
        `${environment.BAseApiURL}/subcategories/${subCatId}`,
        JSON.stringify(subCategory),
        this.httpHeaders
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
