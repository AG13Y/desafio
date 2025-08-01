import { Component, inject, signal } from '@angular/core';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { DicionaryService } from '../../../shared/services/dicionary.services';

@Component({
  selector: 'app-modal-dicionary',
  imports: [],
  templateUrl: './modal-dicionary.html',
  styleUrl: './modal-dicionary.css'
})
export class ModalDicionary {
  constructor(public bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide();
  }
 dictionary: any;

}
