import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagerLeftPanelComponent } from './user-manager-left-panel.component';

describe('UserManagerLeftPanelComponent', () => {
  let component: UserManagerLeftPanelComponent;
  let fixture: ComponentFixture<UserManagerLeftPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagerLeftPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagerLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
