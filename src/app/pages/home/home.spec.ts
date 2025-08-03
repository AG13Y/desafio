import { TestBed } from '@angular/core/testing';
import { Home } from './home';
import { DictionaryService } from '../../shared/services/dictionary.services';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';

class MockDictionaryService {
  getDictionarys() {
    return of([{ id: "1", nome: 'Dicionário Exemplo' }]);
  }

  deleteDictionary(codigo: string) {
    return of({});
  }

  putDictionary(id: string, data: any) {
    return of({});
  }
}

class MockBsModalService {
  show() {
    return {
      content: {},
    } as BsModalRef;
  }
}

describe('Home Component', () => {
  let component: Home;
  let modalService: MockBsModalService;
  let dictionaryService: MockDictionaryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: DictionaryService, useClass: MockDictionaryService },
        { provide: BsModalService, useClass: MockBsModalService },
        { provide: BsModalRef, useValue: {} }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    modalService = TestBed.inject(BsModalService) as any;
    dictionaryService = TestBed.inject(DictionaryService) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch dictionaries on getDicionaries()', () => {
    component.getDicionaries();
    expect(component.dictionaries()[0].id).toEqual('1');
  });

  it('should open the modal with correct data', () => {
    const mockDict = { id: 2, nome: 'Teste' };
    const spy = spyOn(modalService, 'show').and.callThrough();

    component.openModal(mockDict);

    expect(spy).toHaveBeenCalled();
  });

  it('should call deleteDictionary and refresh data', () => {
    const spyDeleteDictionary = spyOn(dictionaryService, 'deleteDictionary').and.callThrough();
    const refreshSpy = spyOn(dictionaryService, 'getDictionarys').and.callThrough();

    component.deleteDictionaries('123');

    // chama manualmente a função que estaria no botão "confirmar"
    const args = (modalService.show as jasmine.Spy).calls.mostRecent().args[1];
    args.initialState.onConfirm();

    expect(spyDeleteDictionary).toHaveBeenCalledWith('123');
    expect(refreshSpy).toHaveBeenCalled();
  });

  it('should call putDictionary and refresh data', () => {
    const dicionario = { id: '999', nome: 'Update Test' };
    const putSpy = spyOn(dictionaryService, 'putDictionary').and.callThrough();
    const refreshSpy = spyOn(dictionaryService, 'getDictionarys').and.callThrough();

    component.editDictionary(dicionario);

    expect(putSpy).toHaveBeenCalledWith('999', dicionario);
    expect(refreshSpy).toHaveBeenCalled();
  });
  
});
