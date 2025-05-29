import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarDetailsComponent } from '../../details/navbarDetails/navbarDetails.component';
import { FooterComponent } from '../../main/contact/footer/footer.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarDetailsComponent],  
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {


  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.addTag({
      name: 'robots',
      content: 'noindex, nofollow'
    });
  }

  goTo(id: string): void {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = +500;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y}); 
    }
  }, 100);
}

  
}
