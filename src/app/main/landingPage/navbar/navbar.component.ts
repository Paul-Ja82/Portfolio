import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
   imports: [CommonModule,],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() menuOpen = false;
  @Output() openMenu = new EventEmitter<void>();
  @Output() closeMenu = new EventEmitter<void>();

  currentLanguage: 'en' | 'de' = 'en';

  constructor(private router: Router) {}

  scrollTo(id: string): void {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = 0;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' }); 
    }
  }, 300);
}

 @HostListener('window:resize', [])
  onResize(): void {
    if (window.innerWidth > 800) {
      this.hideMenu();
    }
  }

  ngOnInit(): void {
    if (window.innerWidth > 800) {
      this.hideMenu();
    }
  }

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
      const storedLang = localStorage.getItem('lang') as 'en' | 'de' | null;
      const storedLook = localStorage.getItem('langLook') as 'en' | 'de' | null;

      if (storedLang === 'de') {
        this.changeLanguageDe(true);
      } else {
        this.changeLanguageEn(true);
      }

      if (storedLook === 'de') {
        this.changeLookDe();
      } else {
        this.changeLookEn();
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const storedLang = localStorage.getItem('lang') as 'en' | 'de' | null;
        const storedLook = localStorage.getItem('langLook') as 'en' | 'de' | null;

        if (storedLang === 'de') {
          this.changeLanguageDe(true);
        } else {
          this.changeLanguageEn(true);
        }

        if (storedLook === 'de') {
          this.changeLookDe();
        } else {
          this.changeLookEn();
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

  showLinkedinError(): void {
  const errorEl = document.querySelector('.linkedin-error') as HTMLElement;
  const buttonEl = document.querySelector('.footer-icons-linkedin') as HTMLElement;

  if (errorEl && buttonEl) {
    errorEl.style.opacity = '1';
    buttonEl.classList.add('active-border');

    setTimeout(() => {
      errorEl.style.opacity = '0';
      buttonEl.classList.remove('active-border');
    }, 1000);
  }
}

  openGit(): void {
  setTimeout(() => {
    window.open('https://github.com/Paul-Ja82', '_blank');
  }, 200); 
}
}
