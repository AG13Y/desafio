import { Component, inject, signal } from '@angular/core';
import { DictionaryService } from '../../shared/services/dictionary.services';
import { RouterLink } from '@angular/router';
import { ModalDicionary } from './components/modal-dicionary/modal-dicionary';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-home',
  imports: [RouterLink, ModalModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  dictionaries = signal<any[]>([]);

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
    this.bsModalRef = this.modalService.show(ModalDicionary, {
      initialState: {
        dictionary,
        onSave: () => this.getDicionaries()
      }
    });
  }

  deleteDictionaries(codigo: number) {
    const confirmDelete = window.confirm("Deseja excluir o Dicionário?");

    if (confirmDelete) {
      this.dicionaryService.deleteDictionary(codigo).subscribe(() => {
        this.getDicionaries();
      });
    }
  }

  editDictionary(dicionario: any) {
    this.dicionaryService.putDictionary(dicionario.id, dicionario).subscribe(() => {
      this.getDicionaries();
    });
  }

}
