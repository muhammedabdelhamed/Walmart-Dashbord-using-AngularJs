import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../../models/category';
import { Subcategory } from '../../../models/subcategory';
import { SubcategoryService } from '../../../services/subcategory.service';
import { CategoryService } from '../../../services/category.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-newsubcategory',
    templateUrl: './newsubcategory.component.html',
    styleUrl: './newsubcategory.component.scss',
    standalone: true,
    imports: [
        NgClass,
        ExtendedModule,
        RouterLink,
        FormsModule,
        NgxDropzoneModule,
    ],
})
export class NewsubcategoryComponent {
  AllCategories: Category[] = [];
  subCategory: Subcategory = {} as Subcategory;
  image: string = '';
  isSmallScreen: boolean = false;
  flagNav: boolean = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public subcategoryService: SubcategoryService,
    public categoryService: CategoryService,
    public router: Router,
    public tost: NgToastService
  ) {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.AllCategories = (data as any).data || [];
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
  }
  //============================< image upload >================================================

  files: File[] = [];

  onSelect(event) {
    // console.log(event);
    this.files.push(...event.addedFiles);
    // console.log(this.files[0]);
  }

  onRemove(event) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  //=============< toggle nave >==========================================================
  toggleNav() {
    this.flagNav = !this.flagNav;
  }
  //=============< Creat New subCategory >===================================================
  AddNewsubCategory() {
    if (!this.files[0]) {
      this.tost.info({
        detail: 'info Message',
        summary: 'upload image first',
        duration: 5000,
      });
      return;
    }

    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'angular-cloudinary');
    data.append('cloud_name', 'doksixv16');

    this.subcategoryService.uploadImage(data).subscribe((res) => {
      if (res) {
        console.log(res);
        this.image = res.secure_url;
        // console.log('image', this.image);
        this.subCategory.image = this.image;
        this.subcategoryService
          .insertNewSubCategory(this.subCategory)
          .subscribe({
            next: (data) => {
              console.log(data);
              this.tost.success({
                detail: 'success Message',
                summary: 'subcategory created successfuly',
                duration: 5000,
              });
              this.router.navigate(['/subcategory/subcategory']);
            },
            error: (err) => {
              this.tost.error({
                detail: 'Error Message',
                summary: 'creat faild creat again',
                duration: 5000,
              });
            },
          });
      }
    });
  }
}
