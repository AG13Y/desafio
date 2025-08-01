import { Component, inject, signal } from '@angular/core';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { DicionaryService } from '../../../shared/services/dicionary.services';


@Component({
  selector: 'app-modal-dicionary',
  imports: [FormsModule],
  templateUrl: './modal-dicionary.html',
  styleUrl: './modal-dicionary.css'
})
export class ModalDicionary {
  dictionary: any;
  editDictionary: any = {};

  dictionaryService = inject(DicionaryService);

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.editDictionary = { ...this.dictionary };
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveEdit() {
    this.dictionaryService.putDictionary(this.editDictionary.id, this.editDictionary).subscribe(() => {
      this.dictionary.nome = this.editDictionary.nome;
      this.closeModal();
    });
  }

}
