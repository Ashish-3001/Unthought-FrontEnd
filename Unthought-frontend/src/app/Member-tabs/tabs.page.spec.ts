import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTabsPage } from './tabs.page';

describe('MemberTabsPage', () => {
  let component: MemberTabsPage;
  let fixture: ComponentFixture<MemberTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberTabsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
