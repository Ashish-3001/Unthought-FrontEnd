import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberProfilePage } from './tab5.page';

describe('Tab5Page', () => {
  let component: MemberProfilePage;
  let fixture: ComponentFixture<MemberProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
