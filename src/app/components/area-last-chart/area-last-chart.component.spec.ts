import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaLastChartComponent } from './area-last-chart.component';

describe('AreaLastChartComponent', () => {
  let component: AreaLastChartComponent;
  let fixture: ComponentFixture<AreaLastChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AreaLastChartComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaLastChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
