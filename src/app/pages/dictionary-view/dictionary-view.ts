import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DictionaryService } from '../../shared/services/dictionary.services';
import { WordService } from '../../shared/services/word.services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalDicionary } from '../dictionary-registration/components/modal-dicionary/modal-dicionary';


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

  dictionaries = signal<any[]>([]);
  dictionary: any;
  palavras: any[] = [];
  dictionaryId: string = '';

  letras: string[] = [];
  letraSelecionada: string = '';
  palavrasPaginadas: any[] = [];

  ngOnInit() {
    this.dictionaryId = String(this.route.snapshot.paramMap.get('id'));

    if (this.dictionaryId) {
      this.dicionaryService.getDictionary(this.dictionaryId).subscribe(data => {
        this.dictionary = data;
        this.getPalavras(true);
      });
    }
  }

  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(dictionary: any) {
    this.bsModalRef = this.modalService.show(ModalDicionary, {
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

  deletePalavra(id: string) {
    const confirmDelete = window.confirm("Deseja excluir esta palavra?");
    if (confirmDelete) {
      this.wordService.deleteDictionaryTexts(id).subscribe(() => {

        this.palavras = this.palavras.filter(p => p.id !== id);

        this.setupPagination();
      });
    }
  }

}
