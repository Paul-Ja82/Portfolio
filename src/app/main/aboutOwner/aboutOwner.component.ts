import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-aboutOwner',
  imports: [CommonModule, RouterModule,],
  templateUrl: './aboutOwner.component.html',
  styleUrl: './aboutOwner.component.scss'
})
export class AboutOwnerComponent {
 scrollTo(id: string): void {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 300);
}
}
