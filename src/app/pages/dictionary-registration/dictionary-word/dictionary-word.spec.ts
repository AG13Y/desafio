import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryWord } from './dictionary-word';

describe('DictionaryWord', () => {
  let component: DictionaryWord;
  let fixture: ComponentFixture<DictionaryWord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryWord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryWord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
