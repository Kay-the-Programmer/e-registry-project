import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessControlComponent } from './user-access-control.component';

describe('UserAccessControlComponent', () => {
  let component: UserAccessControlComponent;
  let fixture: ComponentFixture<UserAccessControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccessControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccessControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
