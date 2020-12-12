import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MentorTabsPage } from './mentor-tabs.page';

describe('MentorTabsPage', () => {
  let component: MentorTabsPage;
  let fixture: ComponentFixture<MentorTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MentorTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
