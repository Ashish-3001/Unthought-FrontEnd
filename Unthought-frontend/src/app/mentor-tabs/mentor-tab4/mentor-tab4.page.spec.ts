import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MentorTab4Page } from './mentor-tab4.page';

describe('MentorTab4Page', () => {
  let component: MentorTab4Page;
  let fixture: ComponentFixture<MentorTab4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorTab4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MentorTab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
