import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MemberActiveZonePage } from './tab2.page';

describe('Tab2Page', () => {
  let component: MemberActiveZonePage;
  let fixture: ComponentFixture<MemberActiveZonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberActiveZonePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberActiveZonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
