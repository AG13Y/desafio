import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDicionary } from './modal-dicionary';

describe('ModalDicionary', () => {
  let component: ModalDicionary;
  let fixture: ComponentFixture<ModalDicionary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDicionary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDicionary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
