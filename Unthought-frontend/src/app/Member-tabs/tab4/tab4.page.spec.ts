import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberPostPage } from './tab4.page';

describe('Tab4Page', () => {
  let component: MemberPostPage;
  let fixture: ComponentFixture<MemberPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
