import { Component, inject, signal } from '@angular/core';
import { DicionaryService } from '../../../shared/services/dicionary.services';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  dictionaries = signal<any[]>([]);

  dicionaryService = inject(DicionaryService);

  ngOnInit() {
    this.getDicionaries();
  }

  getDicionaries() {
    this.dicionaryService.getDictionarys().subscribe(data => {
      this.dictionaries.set(data);
    });
  }

  deleteDictionary(codigo: number) {
    const confirmDelete = window.confirm("Deseja excluir o Dicionário?");
    if (confirmDelete) {
      this.dicionaryService.deleteDictionary(codigo).subscribe(() => {
        this.getDicionaries();
      });
    }
  }

  editDictionary(dictionary: any) {
    this.dicionaryService.putDictionary(dictionary.codigo, dictionary).subscribe(() => {
      this.getDicionaries();
    });
  }

}
