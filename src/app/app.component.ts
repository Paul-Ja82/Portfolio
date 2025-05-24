import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'Portfolio';
  currentLanguage: 'en' | 'de' = 'en';

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const storedLang = localStorage.getItem('lang') as 'en' | 'de' | null;
      if (storedLang === 'de') {
        this.changeLanguageDe(true);
      } else {
        this.changeLanguageEn(true);
      }
    });
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const storedLang = localStorage.getItem('lang') as 'en' | 'de' | null;
        if (storedLang === 'de') {
          this.changeLanguageDe(true);
        } else {
          this.changeLanguageEn(true);
        }
      }
    });
  }
  
  changeLanguageDe(skipStorage = false): void {
    const deElements = document.querySelectorAll<HTMLElement>('.de-language');
    const enElements = document.querySelectorAll<HTMLElement>('.en-language');

    deElements.forEach(el => el.style.display = 'block');
    enElements.forEach(el => el.style.display = 'none');

    this.currentLanguage = 'de';
    if (!skipStorage) localStorage.setItem('lang', 'de');
  }

  changeLanguageEn(skipStorage = false): void {
    const deElements = document.querySelectorAll<HTMLElement>('.de-language');
    const enElements = document.querySelectorAll<HTMLElement>('.en-language');

    deElements.forEach(el => el.style.display = 'none');
    enElements.forEach(el => el.style.display = 'block');

    this.currentLanguage = 'en';
    if (!skipStorage) localStorage.setItem('lang', 'en');
  }
}
