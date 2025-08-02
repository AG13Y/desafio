import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicionaryService } from '../../../shared/services/dicionary.services';
import { WordService } from '../../../shared/services/word.services';
import { ModalWord } from '../modal-word/modal-word';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dictionary-word',
  imports: [],
  templateUrl: './dictionary-word.html',
  styleUrl: './dictionary-word.css'
})
export class DictionaryWord {
  bsModalRef?: BsModalRef;
  
  dictionary: any;
  palavras: any[] = [];
  route = inject(ActivatedRoute);
  dicionaryService = inject(DicionaryService);
  wordService = inject(WordService);

  letras: string[] = [];
  letraSelecionada: string = '';
  palavrasPaginadas: any[] = [];
  
  constructor(private modalService: BsModalService) {}

  ngOnInit() {
  const id = String(this.route.snapshot.paramMap.get('id'));
  if (id) {
    this.dicionaryService.getDictionary(id).subscribe(data => {
      this.dictionary = data;
      this.getPalavras();
    });
  }
}
  
  getPalavras() {
  const id = String(this.route.snapshot.paramMap.get('id'));
  this.wordService.getDictionaryTexts().subscribe(textos => {
      let palavrasFiltradas = textos.filter(texto => texto.dicionarioId === id);

      
      palavrasFiltradas = palavrasFiltradas.sort((a, b) => a.texto.localeCompare(b.texto));

      this.palavras = palavrasFiltradas;
      this.setupPagination();
    });
}

  setupPagination() {
  
  this.letras = Array.from(new Set(this.palavras.map(p => p.texto[0].toUpperCase()))).sort();

  
  if (this.palavras.length < 25) {
    this.letraSelecionada = '';
    this.palavrasPaginadas = this.palavras;
  } else {
    
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