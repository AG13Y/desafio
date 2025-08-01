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
    this.palavras = textos.filter(texto => texto.dicionarioId === id);
  });
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
    }
  });
}

}