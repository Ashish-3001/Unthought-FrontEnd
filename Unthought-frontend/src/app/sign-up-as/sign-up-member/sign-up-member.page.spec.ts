import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpMemberPage } from './sign-up-member.page';

describe('SignUpMemberPage', () => {
  let component: SignUpMemberPage;
  let fixture: ComponentFixture<SignUpMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpMemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
