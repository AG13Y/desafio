import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryWords } from './dictionary-words';

describe('DictionaryWord', () => {
  let component: DictionaryWords;
  let fixture: ComponentFixture<DictionaryWords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryWords]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryWords);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
