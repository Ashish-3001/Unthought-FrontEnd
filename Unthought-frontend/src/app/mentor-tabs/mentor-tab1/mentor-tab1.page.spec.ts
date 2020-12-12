import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MentorTab1Page } from './mentor-tab1.page';

describe('MentorTab1Page', () => {
  let component: MentorTab1Page;
  let fixture: ComponentFixture<MentorTab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorTab1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MentorTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
