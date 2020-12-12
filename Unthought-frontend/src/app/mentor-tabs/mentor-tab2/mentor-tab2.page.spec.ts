import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MentorTab2Page } from './mentor-tab2.page';

describe('MentorTab2Page', () => {
  let component: MentorTab2Page;
  let fixture: ComponentFixture<MentorTab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorTab2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MentorTab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
