import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinComponent } from './join/join.component';
import { PolloLocoComponent } from './polloLoco/polloLoco.component';
import { PokedexComponent } from './pokedex/pokedex.component';

@Component({
  selector: 'app-projectsDone',
  imports: [CommonModule, JoinComponent, PolloLocoComponent, PokedexComponent],
  templateUrl: './projectsDone.component.html',
  styleUrl: './projectsDone.component.scss'
})
export class ProjectsDoneComponent {

}