import {TestBed } from '@angular/core/testing';

import { DictionaryView } from './dictionary-view';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DictionaryService } from '../../shared/services/dictionary.services';
import { WordService } from '../../shared/services/word.services';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class MockDictionaryService {
  getDictionary(id: string) {
    return of({ id: "1", nome: 'Dicionário Exemplo', cor_botao: '', cor_botao_fonte: '', cor_titulo: '', cor_icone: '' });
  }
  putDictionary(id: string, data: any) {
    return of({});
  }
}

class MockWordService {
  getDictionaryTexts(dicionarioId: string) {
    return of([
      { id: "w1", dicionarioId: "1", texto: "Palavra", definicao: "Definição", definicao_extra: "Extra" }
    ]);
  }
}

class MockBsModalService {
  show() {
    return { content: {} } as BsModalRef;
  }
}

describe('DictionaryView', () => {
  let component: DictionaryView;
  let modalService: MockBsModalService;
  let dictionaryService: MockDictionaryService;
  let wordService: MockWordService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryView],
      providers: [
        { provide: DictionaryService, useClass: MockDictionaryService },
        { provide: WordService, useClass: MockWordService },
        { provide: BsModalService, useClass: MockBsModalService },
        { provide: BsModalRef, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(DictionaryView);
    component = fixture.componentInstance;
    modalService = TestBed.inject(BsModalService) as any;
    dictionaryService = TestBed.inject(DictionaryService) as any;
    wordService = TestBed.inject(WordService) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch dictionary and palavras', () => {
    component.dictionaryId = "1";
    component.getPalavras();
    expect(component.palavras.length).toBeGreaterThan(0);
    expect(component.palavras[0].texto).toEqual("Palavra");
  });

  it('should open the modal with correct data', () => {
    const mockDict = { id: "1", nome: "Teste" };
    const spy = spyOn(modalService, 'show').and.callThrough();

    component.openModal(mockDict);

    expect(spy).toHaveBeenCalled();
  });

  it('should open view more modal with correct data', () => {
    const mockWord = { id: "w1", texto: "Palavra", definicao: "Definição", definicao_extra: "Extra", dicionarioId: "1" };
    const spy = spyOn(modalService, 'show').and.callThrough();

    component.openModalViewMore(mockWord);

    expect(spy).toHaveBeenCalled();
  });
});
