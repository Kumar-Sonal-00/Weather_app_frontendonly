import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForcastingComponent } from './weather-forcasting.component';

describe('WeatherForcastingComponent', () => {
  let component: WeatherForcastingComponent;
  let fixture: ComponentFixture<WeatherForcastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherForcastingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherForcastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
