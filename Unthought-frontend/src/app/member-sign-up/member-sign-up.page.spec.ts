import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberSignUpPage } from './member-sign-up.page';

describe('MemberSignUpPage', () => {
  let component: MemberSignUpPage;
  let fixture: ComponentFixture<MemberSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSignUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
