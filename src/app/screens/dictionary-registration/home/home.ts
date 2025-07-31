import { Component } from '@angular/core';
import { OrdenarAlfabeticamentePipe } from '../../../shared/pipes/ordenar-alfabeticamente-pipe';


@Component({
  selector: 'app-home',
  imports: [OrdenarAlfabeticamentePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
