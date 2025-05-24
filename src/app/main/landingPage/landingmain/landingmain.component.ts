import {
  Component,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-landingmain',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './landingmain.component.html',
  styleUrl: './landingmain.component.scss'
})
export class LandingMainComponent {
  showIntro = false;
  rotateSvg = false;
  useRolling = true;
  animateIntroText = false;
  showPolaroidColor = false;
  private introInterval: any;

  @Output() click = new EventEmitter<MouseEvent>();
  @Output() sectionClick = new EventEmitter<void>();

  onClick(event: MouseEvent): void {
    this.click.emit(event);
  }

  handleClick(): void {
    this.sectionClick.emit();
  }

  isDesktop(): boolean {
    return window.innerWidth >= 800;
  }

  ngOnInit(): void {
    this.setupResponsiveIntro();
    window.addEventListener('resize', this.setupResponsiveIntro.bind(this));
  }

  setupResponsiveIntro(): void {
    const isMobile = window.innerWidth < 800;

    this.useRolling = !isMobile;
    if (isMobile && !this.introInterval) {
      this.introInterval = setInterval(() => {
        this.toggleIntro(true);
        this.showPolaroidColor = true;

        setTimeout(() => {
          this.toggleIntro(false);
          this.showPolaroidColor = false;
        }, 4000);
      }, 8000);
    }

    if (!isMobile && this.introInterval) {
      clearInterval(this.introInterval);
      this.introInterval = null;
      this.showIntro = false;
      this.showPolaroidColor = false;
    }
  }

  toggleIntro(state: boolean): void {
    this.showIntro = state;
  
    if (state) {
      this.rotateSvg = false;
      this.animateIntroText = false;
      requestAnimationFrame(() => {
        this.rotateSvg = true;
        this.animateIntroText = true;
      });
    }
  }

   scrollTo(id: string): void {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = +200;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' }); 
    }
  }, 300);
}
  
}
