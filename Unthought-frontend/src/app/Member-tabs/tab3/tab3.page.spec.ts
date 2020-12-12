import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MemberPostPage } from './tab3.page';

describe('Tab3Page', () => {
  let component: MemberPostPage;
  let fixture: ComponentFixture<MemberPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberPostPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
