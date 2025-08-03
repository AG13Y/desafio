import { Component, inject, signal } from '@angular/core';
import { DictionaryService } from '../../shared/services/dictionary.services';
import { RouterLink } from '@angular/router';
import { ModalDictionary } from './components/modal-dictionary/modal-dictionary';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ModalExcluir } from './components/modal-excluir/modal-excluir';
import { IDictionary } from '../../shared/interfaces/dictionary.interfaces';



@Component({
  selector: 'app-home',
  imports: [RouterLink, ModalModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  dictionaries = signal<IDictionary[]>([]);

  dicionaryService = inject(DictionaryService);

  ngOnInit() {
    this.getDicionaries();
  }

  getDicionaries() {
    this.dicionaryService.getDictionarys().subscribe(data => {
      this.dictionaries.set(data);
    });
  }

  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(dictionary: any) {
    this.bsModalRef = this.modalService.show(ModalDictionary, {
      initialState: {
        dictionary,
        onSave: () => this.getDicionaries()
      }
    });
  }

  deleteDictionaries(codigo: string | null) {
    if (!codigo) return;
    
    this.bsModalRef = this.modalService.show(ModalExcluir, {
      initialState: {
        message: 'Deseja excluir o Dicionário?',
        onConfirm: () => {
          this.dicionaryService.deleteDictionary(codigo).subscribe(() => {
            this.getDicionaries();
          });
        }
      }
    });
  }

  editDictionary(dicionario: any) {
    this.dicionaryService.putDictionary(dicionario.id, dicionario).subscribe(() => {
      this.getDicionaries();
    });
  }

}
