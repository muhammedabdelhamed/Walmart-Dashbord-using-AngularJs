import { Component, OnInit } from '@angular/core';
import { Products } from '../../../models/products';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductRequestsService } from '../../../services/product-requests.service';
import { Reviews } from '../../../models/reviews';
import { ReviewsService } from '../../../services/reviews.service';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass, DatePipe } from '@angular/common';
@Component({
    selector: 'app-detailproduct',
    templateUrl: './detailproduct.component.html',
    styleUrl: './detailproduct.component.scss',
    standalone: true,
    imports: [
        NgClass,
        ExtendedModule,
        RouterLink,
        DatePipe,
    ],
})
export class DetailproductComponent implements OnInit {
  currentProduct: object | any = '';
  product: Products | undefined = undefined;
  isSmallScreen: boolean = false;
  flagNav: boolean = true;
  AllProductReviews: Reviews[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    public activetedRout: ActivatedRoute,
    public productService: ProductRequestsService,
    public reviewsservice: ReviewsService,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.breakpointObserver
      .observe('(min-width: 939px)')
      .subscribe((result) => {
        this.isSmallScreen = !result.matches;
      });
    //======================< current product >=========================================================
    this.activetedRout.paramMap.subscribe((paramMap) => {
      this.currentProduct = paramMap.get(`id`);
      // console.log(this.currentProduct);
      this.productService
        .getProductById(this.currentProduct)
        .subscribe((data) => {
          if (data) {
            // console.log(data);
            this.product = (data as any).data || [];
          } else {
            alert('this product is not found');
            this.router.navigate([`/product/product`]);
          }
        });
      //========================< product reviews >===================================================
      this.reviewsservice
        .getAllProductReviews(this.currentProduct)
        .subscribe((data) => {
          if (data) {
            // console.log(data);
            this.AllProductReviews = (data as any).allReviews || [];
            // console.log(this.AllProductReviews);
          } else {
            alert('this product is not found');
            this.router.navigate([`/product/product`]);
          }
        });
    });
  }
  //======================< nav toggel >=========================================================
  toggleNav() {
    this.flagNav = !this.flagNav;
  }
  //==================< delet review >=========================================================
  removeReview(_id: number | undefined) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmDelete) {
      this.reviewsservice.deletReview(_id).subscribe(() => {
        this.AllProductReviews = this.AllProductReviews.filter(
          (review) => review._id !== _id
        );
      });
    }
  }
}
