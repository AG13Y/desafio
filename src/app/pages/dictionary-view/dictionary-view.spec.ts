import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryView } from './dictionary-view';

describe('ReferenceContainer', () => {
  let component: DictionaryView;
  let fixture: ComponentFixture<DictionaryView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
