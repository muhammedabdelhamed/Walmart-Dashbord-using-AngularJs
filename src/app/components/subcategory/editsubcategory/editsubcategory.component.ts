import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    selector: 'app-editsubcategory',
    templateUrl: './editsubcategory.component.html',
    styleUrl: './editsubcategory.component.scss',
    standalone: true,
    imports: [
        NgClass,
        ExtendedModule,
        RouterLink,
        FormsModule,
        NgxDropzoneModule,
    ],
})
export class EditsubcategoryComponent implements OnInit {
  AllCategories: Category[] = [];
  image: string = '';
  subCategory: Subcategory = {} as Subcategory;
  isSmallScreen: boolean = false;
  flagNav: boolean = true;
  currentSubCategory: string | any = '';
  subcategoryById: Subcategory | undefined = undefined;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public subcategoryService: SubcategoryService,
    public router: Router,
    public activetedRout: ActivatedRoute,
    public categoryService: CategoryService,
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
  //==========================< current subcategory >==========================================
  ngOnInit(): void {
    this.breakpointObserver
      .observe('(min-width: 939px)')
      .subscribe((result) => {
        this.isSmallScreen = !result.matches;
      });
    this.activetedRout.paramMap.subscribe((paramMap) => {
      this.currentSubCategory = paramMap.get(`id`);
      // console.log(this.currentSubCategory);
      this.subcategoryService
        .getSubCategoryById(this.currentSubCategory)
        .subscribe((data) => {
          if (data) {
            // console.log(data);
            this.subCategory = (data as any).data || [];
          } else {
            alert('this category is not found');
            this.router.navigate([`/subcategory/subcategory`]);
          }
        });
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
  //=============< update New subCategory >===================================================
  updatesubCategory() {
    if (this.files[0]) {
      const file_data = this.files[0];
      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'angular-cloudinary');
      data.append('cloud_name', 'doksixv16');

      this.subcategoryService.uploadImage(data).subscribe((res) => {
        if (res) {
          // console.log(res);
          this.image = res.secure_url;
          // console.log('image', this.image);
          this.subCategory.image = this.image;
          this.subcategoryService
            .updateSubCtegory(this.currentSubCategory, this.subCategory)
            .subscribe({
              next: (data) => {
                // console.log(data);
                this.tost.success({
                  detail: 'success Message',
                  summary: 'subcategory updated successfuly',
                  duration: 5000,
                });
                this.router.navigate([`/subcategory/subcategory`]);
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
      });
    }
    this.subcategoryService
      .updateSubCtegory(this.currentSubCategory, this.subCategory)
      .subscribe({
        next: (data) => {
          // console.log(data);
          this.tost.success({
            detail: 'success Message',
            summary: 'subcategory updated successfuly',
            duration: 5000,
          });
          this.router.navigate([`/subcategory/subcategory`]);
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
