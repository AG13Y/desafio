import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordService } from '../../../shared/services/word.services';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-word',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modal-word.html',
  styleUrl: './modal-word.css'
})
export class ModalWord {
  texto: any;
  form!: FormGroup;
  onSave?: () => void;

  wordService = inject(WordService);
  fb = inject(FormBuilder);

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.form = this.fb.group({
      texto: [this.texto?.texto || '', Validators.required],
      definicao: [this.texto?.definicao || ''],
      definicao_extra: [this.texto?.definicao_extra || ''],
      dicionarioId: [this.texto?.dicionarioId || '', Validators.required]
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveEdit() {
    if (this.form.invalid) return;

    if (this.texto?.id) {
      // Editar texto existente
      this.wordService.putDictionaryTexts(this.texto.id, this.form.value).subscribe(() => {
        if (this.onSave) this.onSave();
        this.closeModal();
      });
    } else {
      // Criar novo texto
      this.wordService.postDictionaryTexts(this.form.value).subscribe(() => {
        if (this.onSave) this.onSave();
        this.closeModal();
      });
    }
  }
}
