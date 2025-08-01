import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceContainer } from './reference-container';

describe('ReferenceContainer', () => {
  let component: ReferenceContainer;
  let fixture: ComponentFixture<ReferenceContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
