import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWord } from './modal-word';

describe('ModalWord', () => {
  let component: ModalWord;
  let fixture: ComponentFixture<ModalWord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalWord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalWord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
