import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DictionaryView } from './pages/dictionary-view/dictionary-view';
import { DictionaryWords } from './pages/home/pages/dictionary-words/dictionary-words';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    {path: 'home', component: Home},

    {path: 'dictionary-view/:id', component: DictionaryView},

    {path: 'dictionary-words/:id', component: DictionaryWords}
];
