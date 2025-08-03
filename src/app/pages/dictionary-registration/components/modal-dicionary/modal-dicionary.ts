import { Component, inject, signal } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DicionaryService } from '../../../../shared/services/dicionary.services';


@Component({
  selector: 'app-modal-dicionary',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modal-dicionary.html',
  styleUrl: './modal-dicionary.css'
})
export class ModalDicionary {
  dictionary: any;
  form!: FormGroup;
  onSave?: () => void;

  dictionaryService = inject(DicionaryService);
  fb = inject(FormBuilder);

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [this.dictionary?.nome || '', Validators.required],
      cor_botao: [this.dictionary?.cor_botao || '#263D8A'],
      cor_botao_fonte: [this.dictionary?.cor_botao_fonte || '#FFFFFF'],
      cor_titulo: [this.dictionary?.cor_titulo || '#263D8A'],
      cor_icone: [this.dictionary?.cor_icone || '#263D8A']
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveEdit() {
    if (this.form.invalid) return;

    if (this.dictionary?.id) {


      this.dictionaryService.putDictionary(this.dictionary.id, this.form.value).subscribe(() => {

        if (this.onSave) this.onSave();

        this.closeModal();
      });
    } else {
      this.dictionaryService.postDictionary(this.form.value).subscribe(() => {

        if (this.onSave) this.onSave();

        this.closeModal();
      });

    }
  }
}
