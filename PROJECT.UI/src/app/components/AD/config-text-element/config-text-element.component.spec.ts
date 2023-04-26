import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTextElementComponent } from './config-text-element.component';

describe('ConfigTextElementComponent', () => {
  let component: ConfigTextElementComponent;
  let fixture: ComponentFixture<ConfigTextElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigTextElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigTextElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
