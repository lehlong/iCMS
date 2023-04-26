import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateContractComponent } from './template-contract.component';

describe('TemplateContractComponent', () => {
  let component: TemplateContractComponent;
  let fixture: ComponentFixture<TemplateContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
