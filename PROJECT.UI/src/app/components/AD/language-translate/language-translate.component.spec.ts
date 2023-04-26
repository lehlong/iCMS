import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTranslateComponent } from './language-translate.component';

describe('LanguageTranslateComponent', () => {
  let component: LanguageTranslateComponent;
  let fixture: ComponentFixture<LanguageTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageTranslateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
