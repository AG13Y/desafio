import { Routes } from '@angular/router';
import { Home } from './screens/dictionary-registration/home/home';
import { ReferenceContainer } from './screens/reference-dictionary/reference-container/reference-container';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    {path: 'home', component: Home},

    {path: 'reference-dictionary', component: ReferenceContainer}
];
