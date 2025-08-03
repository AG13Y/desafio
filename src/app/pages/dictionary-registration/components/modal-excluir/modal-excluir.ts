import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-excluir',
  imports: [],
  templateUrl: './modal-excluir.html',
  styleUrl: './modal-excluir.css'
})
export class ModalExcluir {
  message: string = '';
  onConfirm?: () => void;
  onCancel?: () => void;

  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    if (this.onConfirm) this.onConfirm();
    this.bsModalRef.hide();
  }

  cancel() {
    if (this.onCancel) this.onCancel();
    this.bsModalRef.hide();
  }
  

}
