import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpMentorPage } from './sign-up-mentor.page';

describe('SignUpMentorPage', () => {
  let component: SignUpMentorPage;
  let fixture: ComponentFixture<SignUpMentorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpMentorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpMentorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
