import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LandingPageComponent } from './landingPage/landingPage.component';
import { AboutOwnerComponent } from './aboutOwner/aboutOwner.component';
import { CapabilityComponent } from './capabilitySection/capability.component';
import { ProjectsDoneComponent } from './projectsDone/projectsDone.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    LandingPageComponent,
    AboutOwnerComponent,
    CapabilityComponent,
    ProjectsDoneComponent,
    ContactComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private router: Router) {}

  ng(): void {
    if (this.router.url.includes('/projects/aboutOwner')) {
      setTimeout(() => {
        const target = document.getElementById('aboutOwner');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

}
