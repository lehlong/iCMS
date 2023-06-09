import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupDetailComponent } from './user-group-detail.component';

describe('UserGroupDetailComponent', () => {
  let component: UserGroupDetailComponent;
  let fixture: ComponentFixture<UserGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
