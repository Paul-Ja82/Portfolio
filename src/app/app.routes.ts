import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { JodetailsComponent } from './details/jodetails/jodetails.component';
import { PollodetailsComponent } from './details/pollodetails/pollodetails.component';
import { PokedetailsComponent } from './details/pokedetails/pokedetails.component';
import { LegalComponent } from './imprint/legal/legal.component';
import { PrivacyComponent } from './imprint/privacy/privacy.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'join', component: JodetailsComponent }, 
  { path: 'polloLoco', component: PollodetailsComponent },
  { path: 'pokedex', component: PokedetailsComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'Main', component: MainComponent },
];

