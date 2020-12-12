import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MemberHomePage } from './tab1.page';

describe('Tab1Page', () => {
  let component: MemberHomePage;
  let fixture: ComponentFixture<MemberHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberHomePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
