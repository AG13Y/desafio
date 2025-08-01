import { Routes } from '@angular/router';
import { Home } from './screens/dictionary-registration/home/home';
import { ReferenceContainer } from './screens/reference-dictionary/reference-container/reference-container';
import { DictionaryWord } from './screens/dictionary-registration/dictionary-word/dictionary-word';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    {path: 'home', component: Home},

    {path: 'reference-dictionary', component: ReferenceContainer},

    {path: 'dictionary-word/:id', component: DictionaryWord}
];
