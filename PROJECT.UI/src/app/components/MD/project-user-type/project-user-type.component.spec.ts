import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUserTypeComponent } from './project-user-type.component';

describe('ProjectUserTypeComponent', () => {
  let component: ProjectUserTypeComponent;
  let fixture: ComponentFixture<ProjectUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectUserTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
