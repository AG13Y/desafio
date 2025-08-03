import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicionaryService } from '../../../../shared/services/dicionary.services';
import { WordService } from '../../../../shared/services/word.services';
import { ModalWord } from '../../components/modal-word/modal-word';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dictionary-words',
  imports: [],
  templateUrl: './dictionary-words.html',
  styleUrl: './dictionary-words.css'
})
export class DictionaryWords {
  bsModalRef?: BsModalRef;

  dictionary: any;
  palavras: any[] = [];
  route = inject(ActivatedRoute);
  dicionaryService = inject(DicionaryService);
  wordService = inject(WordService);

  letras: string[] = [];
  letraSelecionada: string = '';
  palavrasPaginadas: any[] = [];

  constructor(private modalService: BsModalService) { }

  dictionaryId: string = '';

  ngOnInit() {
    this.dictionaryId = String(this.route.snapshot.paramMap.get('id'));
    if (this.dictionaryId) {
      this.dicionaryService.getDictionary(this.dictionaryId).subscribe(data => {
        this.dictionary = data;
        this.getPalavras(true);

      });
    }
  }

  getPalavras(forceFirst: boolean = false) {

    this.wordService.getDictionaryTexts(this.dictionaryId).subscribe(textos => {
      let palavrasFiltradas = textos.filter(texto => texto.dicionarioId === this.dictionaryId);

      this.palavras = palavrasFiltradas;
      this.setupPagination(forceFirst);
    });
  }

  setupPagination(forceFirst: boolean = false) {

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

  deletePalavra(id: string) {
    const confirmDelete = window.confirm("Deseja excluir esta palavra?");
    if (confirmDelete) {
      this.wordService.deleteDictionaryTexts(id).subscribe(() => {

        this.palavras = this.palavras.filter(p => p.id !== id);

        this.setupPagination();
      });
    }
  }

  openModal(texto?: any) {
    const payload = texto || { dicionarioId: this.dictionary.id };
    this.bsModalRef = this.modalService.show(ModalWord, {
      initialState: {
        texto: payload,
        onSave: () => this.getPalavras()
      },
      class: 'modal-lg custom-modal-size'
    });
  }

}