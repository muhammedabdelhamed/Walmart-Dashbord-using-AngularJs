import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailsubcategoryComponent } from './detailsubcategory/detailsubcategory.component';
import { NewsubcategoryComponent } from './newsubcategory/newsubcategory.component';
import { EditsubcategoryComponent } from './editsubcategory/editsubcategory.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

const routes: Routes = [
  {
    path: `subcategory`,
    component: SubcategoryComponent,
    title: `All subcategory`,
  },
  {
    path: `newsubcategory`,
    component: NewsubcategoryComponent,
    title: `new subcategory`,
  },
  {
    path: `detailsubcategory/:id`,
    component: DetailsubcategoryComponent,
    title: `subcategory details`,
  },
  {
    path: `editsubcategory/:id`,
    component: EditsubcategoryComponent,
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
        SubcategoryComponent,
        DetailsubcategoryComponent,
        NewsubcategoryComponent,
        EditsubcategoryComponent,
    ],
})
export class SubcategoryModule {}
