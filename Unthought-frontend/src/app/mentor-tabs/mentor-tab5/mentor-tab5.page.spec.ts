import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MentorTab5Page } from './mentor-tab5.page';

describe('MentorTab5Page', () => {
  let component: MentorTab5Page;
  let fixture: ComponentFixture<MentorTab5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorTab5Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MentorTab5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
