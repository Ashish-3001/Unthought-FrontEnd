import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpInvestorPage } from './sign-up-investor.page';

describe('SignUpInvestorPage', () => {
  let component: SignUpInvestorPage;
  let fixture: ComponentFixture<SignUpInvestorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpInvestorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpInvestorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
