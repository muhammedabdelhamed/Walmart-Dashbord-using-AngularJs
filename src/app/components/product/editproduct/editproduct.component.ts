import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Products } from '../../../models/products';
import { Category } from '../../../models/category';
import { Subcategory } from '../../../models/subcategory';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SubcategoryService } from '../../../services/subcategory.service';
import { ProductRequestsService } from '../../../services/product-requests.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-editproduct',
    templateUrl: './editproduct.component.html',
    styleUrl: './editproduct.component.scss',
    standalone: true,
    imports: [
        NgClass,
        ExtendedModule,
        RouterLink,
        FormsModule,
        NgxDropzoneModule,
    ],
})
export class EditproductComponent implements OnInit {
  thumbnailUrl: string = '';
  imageUrls: string[] = [];
  product: Products = {} as Products;
  AllCategories: Category[] = [];
  AllSubCategories: Subcategory[] = [];
  isSmallScreen: boolean = false;
  flagNav: boolean = true;
  currentproduct: string | any = '';
  productId: Products | undefined = undefined;
  constructor(
    public productsService: ProductRequestsService,
    public router: Router,
    public categoryService: CategoryService,
    public subCategoryService: SubcategoryService,
    private breakpointObserver: BreakpointObserver,
    public activetedRout: ActivatedRoute,
    public tost: NgToastService
  ) {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.AllCategories = (data as any).data || [];
        // console.log(this.AllCategories);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.subCategoryService.getAllSubCategories().subscribe({
      next: (data) => {
        this.AllSubCategories = (data as any).data || [];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.breakpointObserver
      .observe('(min-width: 939px)')
      .subscribe((result) => {
        this.isSmallScreen = !result.matches;
      });

    this.activetedRout.paramMap.subscribe((paramMap) => {
      this.currentproduct = paramMap.get(`id`);
      console.log(this.currentproduct);
      this.productsService
        .getProductById(this.currentproduct)
        .subscribe((data) => {
          if (data) {
            // console.log(data);
            this.product = (data as any).data || [];
          } else {
            alert('this category is not found');
            this.router.navigate([`/product/product`]);
          }
        });
    });
  }
  //============================< image upload >================================================

  file: File[] = [];
  files: File[] = [];

  onSelectThumbnail(event) {
    // console.log(event);
    this.file.push(...event.addedFiles);
    // console.log(this.file[0]);
  }
  onSelectImage(event) {
    this.files.push(...event.addedFiles);
    const selectedFile = event.addedFiles[0];
    // console.log(this.files.slice(0 - 4));
  }
  onRemove(event) {
    // console.log(event);
    this.file.splice(this.file.indexOf(event), 1);
  }
  onRemoveImges(event) {
    this.files.splice(this.file.indexOf(event), 1);
  }
  //==========< toggle nav >====================================================
  toggleNav() {
    this.flagNav = !this.flagNav;
  }
  //==========< update Product >===============================================
  updateProduct() {
    if (!this.file[0] || this.files.length <= 4) {
      this.updateProductAndNavigate();
    }

    if (this.file[0]) {
      const thumbnailFormData = new FormData();
      thumbnailFormData.append('file', this.file[0]);
      thumbnailFormData.append('upload_preset', 'angular-cloudinary');
      thumbnailFormData.append('cloud_name', 'doksixv16');

      this.productsService
        .uploadImage(thumbnailFormData)
        .subscribe((thumbnailRes) => {
          if (thumbnailRes) {
            console.log('cover image', thumbnailRes);
            this.thumbnailUrl = thumbnailRes.secure_url;
            this.product.thumbnail = this.thumbnailUrl;
            console.log(this.product.thumbnail);
            this.updateProductAndNavigate();
          }
        });
    }
    if (this.files.length <= 4) {
      this.uploadImagesSequentially(0);
    }
  }

  uploadImagesSequentially(index: number) {
    if (index < this.files.length) {
      const imageFormData = new FormData();
      imageFormData.append('file', this.files[index]);
      imageFormData.append('upload_preset', 'angular-cloudinary');
      imageFormData.append('cloud_name', 'doksixv16');

      this.productsService.uploadImage(imageFormData).subscribe((imageRes) => {
        this.imageUrls.push(imageRes.secure_url);
        // console.log('imgs', this.imageUrls);
        this.uploadImagesSequentially(index + 1);
        this.product.images = this.imageUrls;
        if (index === this.files.length - 1) {
          this.updateProductAndNavigate();
        }
      });
    }
  }

  updateProductAndNavigate() {
    this.productsService
      .updateProduct(this.currentproduct, this.product)
      .subscribe({
        next: (data) => {
          // console.log(data);
          this.tost.success({
            detail: 'success Message',
            summary: 'product updated successfuly',
            duration: 5000,
          });
          this.router.navigate([`/product/product`]);
        },
        error: (err) => {
          console.log(err);
          this.tost.error({
            detail: 'Error Message',
            summary: 'update faild update again',
            duration: 5000,
          });
        },
      });
  }
}
