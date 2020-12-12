import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MentorTab3Page } from './mentor-tab3.page';

describe('MentorTab3Page', () => {
  let component: MentorTab3Page;
  let fixture: ComponentFixture<MentorTab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorTab3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MentorTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
