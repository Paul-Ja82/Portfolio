import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingMainComponent } from './landingmain/landingmain.component';

@Component({
  selector: 'app-landingPage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, LandingMainComponent],
  template: `
    <section>
      <div><app-navbar [menuOpen]="menuOpen" (openMenu)="showMenu()"(closeMenu)="hideMenu()"></app-navbar></div>
      <div><app-landingmain (sectionClick)="hideMenu()"></app-landingmain></div>
    </section>
  `,
  styleUrls: ['./landingPage.component.scss']
})
export class LandingPageComponent {
 menuOpen: boolean = false;

  hideMenu(): void {
    this.menuOpen = false;
  }

  showMenu(): void {
    this.menuOpen = true;
  }

}


