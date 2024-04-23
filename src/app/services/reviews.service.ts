import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reviews } from '../models/reviews';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private httpClient: HttpClient) {}

  //=====================< Get All Product Reviews >=====================================
  getAllProductReviews(prdId: string | undefined): Observable<Reviews[]> {
    return this.httpClient.get<Reviews[]>(
      `${environment.BAseApiURL}/reviews/${prdId}`
    );
  }
  //=======================< delet review >============================================
  deletReview(id: number | undefined) {
    var review = `${environment.BAseApiURL}/reviews/${id}`;
    return this.httpClient.delete(review);
  }
}
