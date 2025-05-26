import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
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

  ngOnInit(): void {
    this.initIntro();
  }

  private initIntro(): void {
    if (this.introInterval) return;

    setTimeout(() => {
      this.startInitialIntro();
      this.startIntroInterval();
    }, 2500);
  }

  private startInitialIntro(): void {
    this.toggleIntro(true);
    this.colorizePolaroid(true);

    setTimeout(() => {
      this.toggleIntro(false);
      this.colorizePolaroid(false);
    }, 4000);
  }

  private startIntroInterval(): void {
    this.introInterval = setInterval(() => {
      this.toggleIntro(true);
      this.colorizePolaroid(true);

      setTimeout(() => {
        this.toggleIntro(false);
        this.colorizePolaroid(false);
      }, 4000);
    }, 8000);
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

  private colorizePolaroid(active: boolean): void {
    this.showPolaroidColor = active;
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
