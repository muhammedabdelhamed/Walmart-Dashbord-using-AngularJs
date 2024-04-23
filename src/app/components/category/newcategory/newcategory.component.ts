import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-newcategory',
    templateUrl: './newcategory.component.html',
    styleUrl: './newcategory.component.scss',
    standalone: true,
    imports: [
        NgClass,
        ExtendedModule,
        RouterLink,
        FormsModule,
        NgxDropzoneModule,
    ],
})
export class NewcategoryComponent implements OnInit {
  category: Category = {} as Category;
  image: string = '';
  isSmallScreen: boolean = false;
  flagNav: boolean = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public categoryService: CategoryService,
    public router: Router,
    public tost: NgToastService
  ) {}
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
    console.log(this.files[0]);
  }

  onRemove(event) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  //=============< toggle nave >==========================================================
  toggleNav() {
    this.flagNav = !this.flagNav;
  }
  //=============< Creat New Category >===================================================
  AddNewCategory() {
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

    this.categoryService.uploadImage(data).subscribe((res) => {
      if (res) {
        // console.log(res);
        this.image = res.secure_url;
        // console.log('image', this.image);
        this.category.image = this.image;
        this.categoryService.insertNewCategory(this.category).subscribe({
          next: (data) => {
            this.tost.success({
              detail: 'success Message',
              summary: 'category created successfuly',
              duration: 5000,
            });
            // console.log(data);
            this.router.navigate([`/category/category`]);
          },
          error: (err) => {
            console.log(err);
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
