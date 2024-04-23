import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subcategory } from '../../../models/subcategory';
import { SubcategoryService } from '../../../services/subcategory.service';
import { NgToastService } from 'ng-angular-popup';
import { RouterLink } from '@angular/router';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-subcategory',
    templateUrl: './subcategory.component.html',
    styleUrl: './subcategory.component.scss',
    standalone: true,
    imports: [
        NgClass,
        ExtendedModule,
        RouterLink,
    ],
})
export class SubcategoryComponent {
  isSmallScreen: boolean = false;
  flagNav: boolean = true;
  AllsubCategories: Subcategory[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    public subCategoryServec: SubcategoryService,
    public tost: NgToastService
  ) {}
  //======================< Get All subCategories >================================================
  ngOnInit(): void {
    this.breakpointObserver
      .observe('(min-width: 939px)')
      .subscribe((result) => {
        this.isSmallScreen = !result.matches;
      });

    this.subCategoryServec.getAllSubCategories().subscribe({
      next: (response) => {
        this.AllsubCategories = (response as any).data || [];
        // console.log(this.AllsubCategories);
        this.AllsubCategories.forEach((category) => {
          return category.createdAt, category.updatedAt;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //=======================< toggle nav >======================================================
  toggleNav() {
    this.flagNav = !this.flagNav;
  }
  //=======================< Delete subcategory >==================================================
  removeSubCategory(subCategoryId: string | undefined) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this category?'
    );
    if (confirmDelete) {
      this.subCategoryServec.deletSubCategory(subCategoryId).subscribe(() => {
        this.AllsubCategories = this.AllsubCategories.filter(
          (subCategory) => subCategory._id !== subCategoryId
        );
        this.tost.success({
          detail: 'success Message',
          summary: 'subcategory deleted successfuly',
          duration: 5000,
        });
      });
    }
  }
  //========================< get All subcategory for search >=====================================
  getAllSubcategories() {
    this.subCategoryServec.getAllSubCategories().subscribe({
      next: (response) => {
        this.AllsubCategories = (response as any).data || [];
        // console.log(this.AllsubCategories);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //========================< search by name >==================================================
  nameSearch(filtervalue: string): Subcategory[] {
    filtervalue = filtervalue.toLocaleLowerCase();

    var filteredCategories = this.AllsubCategories.filter(
      (subCategory: Subcategory) => {
        return subCategory.name.toLocaleLowerCase().includes(filtervalue);
      }
    );

    return (this.AllsubCategories = filteredCategories);
  }
}
