import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DicionaryService } from '../../../shared/services/dicionary.services';

@Component({
  selector: 'app-dictionary-word',
  imports: [],
  templateUrl: './dictionary-word.html',
  styleUrl: './dictionary-word.css'
})
export class DictionaryWord {
  dictionary: any;
  route = inject(ActivatedRoute);
  dicionaryService = inject(DicionaryService);

  ngOnInit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.dicionaryService.getDictionary(id).subscribe(data => {
        this.dictionary = data;
      });
    }
  }

}
