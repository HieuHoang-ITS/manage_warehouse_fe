import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureStatisticComponent } from './feature-statistic.component';

describe('FeatureStatisticComponent', () => {
  let component: FeatureStatisticComponent;
  let fixture: ComponentFixture<FeatureStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
