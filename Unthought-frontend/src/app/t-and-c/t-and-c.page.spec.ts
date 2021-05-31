import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TAndCPage } from './t-and-c.page';

describe('TAndCPage', () => {
  let component: TAndCPage;
  let fixture: ComponentFixture<TAndCPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TAndCPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TAndCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
