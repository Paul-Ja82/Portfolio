import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './capability.component.html',
  styleUrl: './capability.component.scss'
})
export class CapabilityComponent implements OnInit, OnDestroy {
  
  pullImageEn = 'pull-close-en.png';
  pullImageDe = 'pull-close-de.png';
  isMobile = false;
  intervalId: any = null;
  backgroundActive = false;

  ngOnInit(): void {
    this.checkScreenSize();
    this.setupBackgroundLoop();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 750;

    if (this.isMobile) {
      this.setupBackgroundLoop();
    } else {
      this.clearBackgroundLoop();
      this.backgroundActive = false;
    }
  }

  setupBackgroundLoop(): void {
    this.clearBackgroundLoop();

    if (this.isMobile) {
      this.intervalId = setInterval(() => {
        this.backgroundActive = true;
        setTimeout(() => {
          this.backgroundActive = false;
        }, 5000);
      }, 10000);
    }
  }

  clearBackgroundLoop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy(): void {
    this.clearBackgroundLoop();
  }

  animatePullEn(): void {
    this.pullImageEn = 'pull-start-en.png';
    setTimeout(() => {
      this.pullImageEn = 'pull-open-en.png';
    }, 500);
    setTimeout(() => {
      this.pullImageEn = 'pull-close-en.png';
    }, 5000);
  }

  animatePullDe(): void {
    this.pullImageDe = 'pull-start-en.png';
    setTimeout(() => {
      this.pullImageDe = 'pull-open-de.png';
    }, 500);
    setTimeout(() => {
      this.pullImageDe = 'pull-close-de.png';
    }, 5000);
  }
}
