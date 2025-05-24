import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { JodetailsComponent } from './details/jodetails/jodetails.component';
import { PollodetailsComponent } from './details/pollodetails/pollodetails.component';
import { PokedetailsComponent } from './details/pokedetails/pokedetails.component';
import { LegalComponent } from './imprint/legal/legal.component';
import { PrivacyComponent } from './imprint/privacy/privacy.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'projects', component: MainComponent }, 
  { path: 'projects/join', component: JodetailsComponent }, 
  { path: 'projects/polloLoco', component: PollodetailsComponent },
  { path: 'projects/pokedex', component: PokedetailsComponent },
  { path: 'projects/legal', component: LegalComponent },
  { path: 'projects/privacy', component: PrivacyComponent },
  { path: 'projects/Main', component: MainComponent },
];

