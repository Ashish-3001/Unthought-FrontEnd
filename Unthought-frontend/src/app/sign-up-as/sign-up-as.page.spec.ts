import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpAsPage } from './sign-up-as.page';

describe('SignUpAsPage', () => {
  let component: SignUpAsPage;
  let fixture: ComponentFixture<SignUpAsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpAsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpAsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
