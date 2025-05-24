import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarDetailsComponent } from '../navbarDetails/navbarDetails.component';


@Component({
  selector: 'app-jodetails',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarDetailsComponent,],  
  templateUrl: './jodetails.component.html',
  styleUrl: './jodetails.component.scss'
})
export class JodetailsComponent {

  goTo(id: string): void {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -200;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y}); 
    }
  }, 100);
}

orientationWarning = false;

  ngOnInit(): void {
    this.checkOrientation();
    window.addEventListener('resize', this.checkOrientation.bind(this));
    window.addEventListener('orientationchange', this.checkOrientation.bind(this));
  }

  checkOrientation(): void {
    const isLandscape = window.innerWidth > window.innerHeight;
    const isMobile = window.innerWidth <= 800;
    this.orientationWarning = isLandscape && isMobile;
  }

  goToProject(): void {
  window.open('https://pauljdietrich.com/Join/', '_blank');
}
  
}
