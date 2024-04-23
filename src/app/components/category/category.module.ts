import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { NewcategoryComponent } from './newcategory/newcategory.component';
import { DetailcategoryComponent } from './detailcategory/detailcategory.component';
import { CategoryComponent } from './category/category.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

const routes: Routes = [
  {
    path: `category`,
    component: CategoryComponent,
    title: `All category`,
  },
  {
    path: `newcategory`,
    component: NewcategoryComponent,
    title: `new category`,
  },
  {
    path: `detailcategory/:id`,
    component: DetailcategoryComponent,
    title: `category details`,
  },
  {
    path: `editcategory/:id`,
    component: EditcategoryComponent,
    title: `category edit`,
  },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FlexLayoutModule,
        FormsModule,
        NgxDropzoneModule,
        EditcategoryComponent,
        NewcategoryComponent,
        DetailcategoryComponent,
        CategoryComponent,
    ],
})
export class CategoryModule {}
