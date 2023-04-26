import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeGridComponent } from './organize-grid.component';

describe('OrganizeGridComponent', () => {
  let component: OrganizeGridComponent;
  let fixture: ComponentFixture<OrganizeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizeGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
