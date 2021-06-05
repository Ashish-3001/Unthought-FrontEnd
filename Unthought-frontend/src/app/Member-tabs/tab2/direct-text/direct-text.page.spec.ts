import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DirectTextPage } from './direct-text.page';

describe('DirectTextPage', () => {
  let component: DirectTextPage;
  let fixture: ComponentFixture<DirectTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectTextPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
