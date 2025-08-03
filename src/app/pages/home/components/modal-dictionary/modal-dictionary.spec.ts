import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDictionary } from './modal-dictionary';

describe('ModalDictionary', () => {
  let component: ModalDictionary;
  let fixture: ComponentFixture<ModalDictionary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDictionary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDictionary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
