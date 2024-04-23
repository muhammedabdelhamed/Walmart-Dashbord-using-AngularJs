import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcategoryComponent } from './detailcategory.component';

describe('DetailcategoryComponent', () => {
  let component: DetailcategoryComponent;
  let fixture: ComponentFixture<DetailcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DetailcategoryComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
