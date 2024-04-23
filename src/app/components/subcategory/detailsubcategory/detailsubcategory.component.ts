import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subcategory } from '../../../models/subcategory';
import { SubcategoryService } from '../../../services/subcategory.service';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass, DatePipe } from '@angular/common';

@Component({
    selector: 'app-detailsubcategory',
    templateUrl: './detailsubcategory.component.html',
    styleUrl: './detailsubcategory.component.scss',
    standalone: true,
    imports: [
        NgClass,
        ExtendedModule,
        RouterLink,
        DatePipe,
    ],
})
export class DetailsubcategoryComponent implements OnInit {
  currentSubCategory: string | any = '';
  subcategory: Subcategory | undefined = undefined;
  isSmallScreen: boolean = false;
  flagNav: boolean = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public activetedRout: ActivatedRoute,
    public subcategoryService: SubcategoryService,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.breakpointObserver
      .observe('(min-width: 939px)')
      .subscribe((result) => {
        this.isSmallScreen = !result.matches;
      });
    //======================< current subcategory >==================================================

    this.activetedRout.paramMap.subscribe((paramMap) => {
      this.currentSubCategory = paramMap.get(`id`);
      console.log(this.currentSubCategory);
      this.subcategoryService
        .getSubCategoryById(this.currentSubCategory)
        .subscribe((data) => {
          if (data) {
            // console.log(data);
            this.subcategory = (data as any).data || [];
          } else {
            alert('this category is not found');
            this.router.navigate([`/subcategory/subcategory`]);
          }
        });
    });
  }
  //======================< nav toggel >=========================================================
  toggleNav() {
    this.flagNav = !this.flagNav;
  }
}
