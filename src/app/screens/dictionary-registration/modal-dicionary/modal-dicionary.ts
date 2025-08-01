import { Component, inject, signal } from '@angular/core';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-modal-dicionary',
  imports: [FormsModule],
  templateUrl: './modal-dicionary.html',
  styleUrl: './modal-dicionary.css'
})
export class ModalDicionary {
  dictionary: any;
  
  constructor(public bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide();
  }


}
