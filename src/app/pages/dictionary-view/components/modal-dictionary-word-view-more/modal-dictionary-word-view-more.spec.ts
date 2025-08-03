import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDictionaryWordViewMore } from './modal-dictionary-word-view-more';

describe('ModalDictionaryWordViewMore', () => {
  let component: ModalDictionaryWordViewMore;
  let fixture: ComponentFixture<ModalDictionaryWordViewMore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDictionaryWordViewMore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDictionaryWordViewMore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
