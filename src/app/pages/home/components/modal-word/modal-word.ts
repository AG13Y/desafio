import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordService } from '../../../../shared/services/word.services';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { IDictionaryWord } from '../../../../shared/interfaces/dictionary-word.interface';



@Component({
  selector: 'app-modal-word',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AngularEditorModule],
  templateUrl: './modal-word.html',
  styleUrl: './modal-word.css'
})
export class ModalWord {

  texto: IDictionaryWord | null = null;
  form!: FormGroup;
  onSave?: () => void;

  wordService = inject(WordService);
  fb = inject(FormBuilder);

  constructor(public bsModalRef: BsModalRef) { };

  ngOnInit() {
    this.form = this.fb.group({

      texto: [this.texto?.texto || '', Validators.required],

      definicao: [this.texto?.definicao || '', Validators.required],

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

      this.wordService.putDictionaryTexts(this.texto.id, this.form.value).subscribe(() => {
        if (this.onSave) this.onSave();
        this.closeModal();
      });
    } else {

      this.wordService.postDictionaryTexts(this.form.value).subscribe(() => {
        if (this.onSave) this.onSave();
        this.closeModal();
      });
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Digite a definição extra...',
    translate: 'no',
    toolbarPosition: 'top',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
      ['insertImage', 'insertVideo']
    ]
  };
}
