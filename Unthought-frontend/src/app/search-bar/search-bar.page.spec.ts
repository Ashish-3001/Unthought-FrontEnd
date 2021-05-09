import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchBarPage } from './search-bar.page';

describe('SearchBarPage', () => {
  let component: SearchBarPage;
  let fixture: ComponentFixture<SearchBarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
