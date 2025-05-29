import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule, } from '@angular/router';

@Component({
  selector: 'app-navbarDetails',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './navbarDetails.component.html',
  styleUrls: ['./navbarDetails.component.scss']
})
export class NavbarDetailsComponent {
  @Input() menuOpen = false;
  @Output() openMenu = new EventEmitter<void>();
  @Output() closeMenu = new EventEmitter<void>();
  @Input() theme: string = '';

  currentLanguage: 'en' | 'de' = 'en';

  constructor(private router: Router) {}

  showMenu(): void {
    this.openMenu.emit(); 
  }

  hideMenu(): void {
    this.closeMenu.emit(); 
  }

  changeLookDe(): void {
    document.querySelectorAll<HTMLElement>('.language-de').forEach(el => el.style.display = 'none');
    document.querySelectorAll<HTMLElement>('.language-de-orange').forEach(el => el.style.display = 'block');
    document.querySelectorAll<HTMLElement>('.language-bar-l').forEach(el => el.style.display = 'none');
    document.querySelectorAll<HTMLElement>('.language-bar-r').forEach(el => el.style.display = 'block');
    document.querySelectorAll<HTMLElement>('.language-en-orange').forEach(el => el.style.display = 'none');
    document.querySelectorAll<HTMLElement>('.language-en').forEach(el => el.style.display = 'block');
  
    localStorage.setItem('langLook', 'de');
  }
  
  changeLookEn(): void {
    document.querySelectorAll<HTMLElement>('.language-de').forEach(el => el.style.display = 'block');
    document.querySelectorAll<HTMLElement>('.language-de-orange').forEach(el => el.style.display = 'none');
    document.querySelectorAll<HTMLElement>('.language-bar-l').forEach(el => el.style.display = 'block');
    document.querySelectorAll<HTMLElement>('.language-bar-r').forEach(el => el.style.display = 'none');
    document.querySelectorAll<HTMLElement>('.language-en-orange').forEach(el => el.style.display = 'block');
    document.querySelectorAll<HTMLElement>('.language-en').forEach(el => el.style.display = 'none');
  
    localStorage.setItem('langLook', 'en');
  }
  
  ngAfterViewInit(): void {
  setTimeout(() => {
    this.applyStoredLanguage();
    this.applyStoredLook();
  });

  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.applyStoredLanguage();
      this.applyStoredLook();
    }
  });
}

private applyStoredLanguage(): void {
  const storedLang = localStorage.getItem('lang') as 'en' | 'de' | null;
  if (storedLang === 'de') {
    this.changeLanguageDe(true);
  } else {
    this.changeLanguageEn(true);
  }
}

private applyStoredLook(): void {
  const storedLook = localStorage.getItem('langLook') as 'en' | 'de' | null;
  if (storedLook === 'de') {
    this.changeLookDe();
  } else {
    this.changeLookEn();
  }
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

 scrollTo(id: string): void {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' }); 
    }
  }, 300);
}

}

