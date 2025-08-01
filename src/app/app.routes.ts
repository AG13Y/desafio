import { Routes } from '@angular/router';
import { Home } from './pages/dictionary-registration/home/home';
import { ReferenceContainer } from './pages/reference-dictionary/reference-container/reference-container';
import { DictionaryWord } from './pages/dictionary-registration/dictionary-word/dictionary-word';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    {path: 'home', component: Home},

    {path: 'reference-dictionary', component: ReferenceContainer},

    {path: 'dictionary-word/:id', component: DictionaryWord}
];
