import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass, DatePipe } from '@angular/common';

@Component({
    selector: 'app-detailcategory',
    templateUrl: './detailcategory.component.html',
    styleUrl: './detailcategory.component.scss',
    standalone: true,
    imports: [
        NgClass,
        ExtendedModule,
        RouterLink,
        DatePipe,
    ],
})
export class DetailcategoryComponent implements OnInit {
  currentCategory: string | any = '';
  category: Category | undefined = undefined;
  isSmallScreen: boolean = false;
  flagNav: boolean = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public activetedRout: ActivatedRoute,
    public categoryService: CategoryService,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.breakpointObserver
      .observe('(min-width: 939px)')
      .subscribe((result) => {
        this.isSmallScreen = !result.matches;
      });
    //======================< current category >====================================================
    this.activetedRout.paramMap.subscribe((paramMap) => {
      this.currentCategory = paramMap.get(`id`);
      // console.log(this.currentCategory);
      this.categoryService
        .getCategoryById(this.currentCategory)
        .subscribe((data) => {
          if (data) {
            // console.log(data);
            this.category = (data as any).data || [];
          } else {
            alert('this category is not found');
            this.router.navigate([`/category/category`]);
          }
        });
    });
  }
  //======================< nav toggel >=========================================================
  toggleNav() {
    this.flagNav = !this.flagNav;
  }
}
