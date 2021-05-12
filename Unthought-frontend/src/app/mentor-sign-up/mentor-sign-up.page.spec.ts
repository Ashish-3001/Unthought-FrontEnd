import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MentorSignUpPage } from './mentor-sign-up.page';

describe('MentorSignUpPage', () => {
  let component: MentorSignUpPage;
  let fixture: ComponentFixture<MentorSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorSignUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MentorSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
