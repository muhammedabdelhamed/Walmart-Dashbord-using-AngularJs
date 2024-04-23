import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { NgToastService } from 'ng-angular-popup';
import { RouterLink } from '@angular/router';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    standalone: true,
    imports: [
        NgClass,
        ExtendedModule,
        RouterLink,
    ],
})
export class CategoryComponent implements OnInit {
  isSmallScreen: boolean = false;
  flagNav: boolean = true;
  AllCategories: Category[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    public categoryServec: CategoryService,
    public tost: NgToastService
  ) {}
  //======================< Get All Categories >================================================
  ngOnInit(): void {
    this.breakpointObserver
      .observe('(min-width: 939px)')
      .subscribe((result) => {
        this.isSmallScreen = !result.matches;
      });

    this.categoryServec.getAllCategories().subscribe({
      next: (response) => {
        this.AllCategories = (response as any).data || [];
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
  //=======================< Delete category >==================================================
  removeCategory(categoryId: string | undefined) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this category?'
    );
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      this.categoryServec.deletCategory(categoryId, token).subscribe(() => {
        this.AllCategories = this.AllCategories.filter(
          (category) => category._id !== categoryId
        );
        this.tost.success({
          detail: 'success Message',
          summary: 'category deleted successfuly',
          duration: 5000,
        });
      });
    }
  }
  //========================< get All category for search >=====================================
  getAllcategories() {
    this.categoryServec.getAllCategories().subscribe({
      next: (response) => {
        this.AllCategories = (response as any).data || [];
        // console.log(this.AllCategories);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //========================< search by name >==================================================
  nameSearch(filtervalue: string): Category[] {
    filtervalue = filtervalue.toLowerCase();

    var filteredCategories = this.AllCategories.filter((category: Category) => {
      return category.name.toLowerCase().includes(filtervalue);
    });

    return (this.AllCategories = filteredCategories);
  }
}
