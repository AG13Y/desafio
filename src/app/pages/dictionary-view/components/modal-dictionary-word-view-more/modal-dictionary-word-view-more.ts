import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { WordService } from '../../../../shared/services/word.services';
import { ActivatedRoute } from '@angular/router';
import { DictionaryService } from '../../../../shared/services/dictionary.services';

@Component({
  selector: 'app-modal-dictionary-word-view-more',
  imports: [],
  templateUrl: './modal-dictionary-word-view-more.html',
  styleUrl: './modal-dictionary-word-view-more.css'
})
export class ModalDictionaryWordViewMore {
  palavra: any;
  dictionary: any;
  dictionaryId: string = '';

  route = inject(ActivatedRoute);
  wordService = inject(WordService);
  dicionaryService = inject(DictionaryService);


  palavras: any[] = [];

  constructor(public bsModalRef: BsModalRef) { };

  ngOnInit() {
    this.dictionaryId = String(this.route.snapshot.paramMap.get('id'));

    if (this.dictionaryId) {
      this.dicionaryService.getDictionary(this.dictionaryId).subscribe(data => {
        this.dictionary = data;
        this.getPalavras(true);
      });
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  getPalavras(forceFirst: boolean = false) {

    this.wordService.getDictionaryTexts(this.dictionaryId).subscribe(textos => {
      let palavrasFiltradas = textos.filter(texto => texto.dicionarioId === this.dictionaryId);

      this.palavras = palavrasFiltradas;
    });
  }
}
