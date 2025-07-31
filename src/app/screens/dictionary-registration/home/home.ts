import { Component, inject, signal } from '@angular/core';
import { DicionaryService } from '../../../shared/services/dicionary.services';



@Component({
  selector: 'app-home',
  imports: [],
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
      console.log('data', data);
      this.dictionaries.set(data)
  });

  }
}
