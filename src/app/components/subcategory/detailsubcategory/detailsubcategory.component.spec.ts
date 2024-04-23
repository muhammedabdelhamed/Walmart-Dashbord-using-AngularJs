import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsubcategoryComponent } from './detailsubcategory.component';

describe('DetailsubcategoryComponent', () => {
  let component: DetailsubcategoryComponent;
  let fixture: ComponentFixture<DetailsubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DetailsubcategoryComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
