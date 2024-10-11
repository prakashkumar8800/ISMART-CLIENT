import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupalertComponent } from './popupalert.component';

describe('PopupalertComponent', () => {
  let component: PopupalertComponent;
  let fixture: ComponentFixture<PopupalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupalertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
