import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DictionaryService } from '../../shared/services/dictionary.services';
import { WordService } from '../../shared/services/word.services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalDictionary } from '../home/components/modal-dictionary/modal-dictionary';
import { ModalDictionaryWordViewMore } from './components/modal-dictionary-word-view-more/modal-dictionary-word-view-more';
import { Location } from '@angular/common';
import { IDictionary } from '../../shared/interfaces/dictionary.interfaces';
import { IDictionaryWord } from '../../shared/interfaces/dictionary-word.interface';

@Component({
  selector: 'app-dictionary-view',
  imports: [RouterLink],
  templateUrl: './dictionary-view.html',
  styleUrl: './dictionary-view.css'
})
export class DictionaryView {

  route = inject(ActivatedRoute);
  dicionaryService = inject(DictionaryService);
  wordService = inject(WordService);
  location = inject(Location);

  dictionaries = signal<IDictionary[]>([]);
  dictionary: IDictionary | null = null;
  palavras: IDictionaryWord[] = [];
  dictionaryId: string = '';

  letras: string[] = [];
  letraSelecionada: string = '';
  palavrasPaginadas: IDictionaryWord[] = [];

  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.dictionaryId = String(this.route.snapshot.paramMap.get('id'));

    if (this.dictionaryId) {

      this.dicionaryService.getDictionary(this.dictionaryId).subscribe(data => {

        this.dictionary = data;
        this.getPalavras(true);
      });
    }
  }

  openModal(dictionary: any) {

    this.bsModalRef = this.modalService.show(ModalDictionary, {
      initialState: {
        dictionary,

        onSave: () => {
          this.dicionaryService.getDictionary(this.dictionaryId).subscribe(data => {
            this.dictionary = data;
          });

          this.getPalavras();
        }
      }
    });
  }

  openModalViewMore(palavra: any) {

  this.bsModalRef = this.modalService.show(ModalDictionaryWordViewMore, {
    initialState: {
      palavra,
      dictionary: this.dictionary
    },

    class: 'custom-modal-size'

  });
}

  getPalavras(forceFirst: boolean = false) {

    this.wordService.getDictionaryTexts(this.dictionaryId).subscribe(textos => {

      let palavrasFiltradas = textos.filter(texto => texto.dicionarioId === this.dictionaryId);

      this.palavras = palavrasFiltradas;
      this.setupPagination(forceFirst);
    });
  }

  setupPagination(forceFirst: boolean = false) {

    if (this.palavras.length < 25) {

      this.letras = [];

      this.letraSelecionada = '';

      this.palavrasPaginadas = this.palavras;
      return;
    }

    this.letras = Array.from(new Set(this.palavras.map(p => p.texto[0].toUpperCase()))).sort();

    if (this.letraSelecionada) {

      this.filtrarPorLetra(this.letraSelecionada);

    } else if (this.palavras.length < 25) {

      this.palavrasPaginadas = this.palavras;

    } else if (forceFirst) {

      this.letraSelecionada = this.letras[0];
      this.filtrarPorLetra(this.letraSelecionada);
    }
  }

  filtrarPorLetra(letra: string) {

    this.letraSelecionada = letra;

    if (letra === '') {
      this.palavrasPaginadas = this.palavras;
    } else {
      this.palavrasPaginadas = this.palavras.filter(p => p.texto[0].toUpperCase() === letra);
    }
  }

  voltar() {
    this.location.back();
  }
}
