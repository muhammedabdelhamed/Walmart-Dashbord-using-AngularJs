import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsubcategoryComponent } from './newsubcategory.component';

describe('NewsubcategoryComponent', () => {
  let component: NewsubcategoryComponent;
  let fixture: ComponentFixture<NewsubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NewsubcategoryComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
