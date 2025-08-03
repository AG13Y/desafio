import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { DictionaryService } from '../../shared/services/dictionary.services';
import { of } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let dictionaryServiceSpy: jasmine.SpyObj<DictionaryService>;
  let bsModalServiceSpy: jasmine.SpyObj<BsModalService>;

  beforeEach(async () => {
  dictionaryServiceSpy = jasmine.createSpyObj('DictionaryService', ['getDictionarys', 'deleteDictionary']);
  const bsModalServiceSpy = jasmine.createSpyObj('BsModalService', ['show']);

  await TestBed.configureTestingModule({
    imports: [Home],
    providers: [
      { provide: DictionaryService, useValue: dictionaryServiceSpy },
      { provide: BsModalService, useValue: bsModalServiceSpy }
    ]
  }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDicionaries and set dictionaries', () => {
    const mockData = [
      { id: '1', nome: 'Teste', cor_botao: '', cor_botao_fonte: '', cor_titulo: '', cor_icone: '' }
    ];
    dictionaryServiceSpy.getDictionarys.and.returnValue(of(mockData));
    component.getDicionaries();
    expect(dictionaryServiceSpy.getDictionarys).toHaveBeenCalled();
    expect(component.dictionaries()).toEqual(mockData);
  });
});
