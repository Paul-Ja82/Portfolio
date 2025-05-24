import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone:true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

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

 triggerFooterIconAnimation(target: 'github' | 'linkedin' | 'email'): void {
  const idMap = {
    github: 'icon-github',
    linkedin: 'icon-linkedin',
    email: 'icon-email',
  };

  const icon = document.getElementById(idMap[target]);

  if (icon) {
    this.startIconAnimation(icon);
    this.resetIconAnimationAfterDelay(icon, 1000);
  }
}

private startIconAnimation(icon: HTMLElement): void {
  icon.classList.remove('animate');
  void icon.offsetWidth; 
  icon.classList.add('animate');
  icon.style.opacity = '1';
}

private resetIconAnimationAfterDelay(icon: HTMLElement, delay: number): void {
  setTimeout(() => {
    icon.classList.remove('animate');
    icon.style.opacity = '0';
  }, delay);
}


openGit(): void {
  setTimeout(() => {
    window.open('https://github.com/Paul-Ja82', '_blank');
  }, 1000); 
}

showLinkedinError(): void {
  const el = document.querySelector('.linkedin-error') as HTMLElement;
  if (el) {
    el.style.opacity = '1';

    setTimeout(() => {
      el.style.opacity = '0';
    }, 1000);
  }
}


}
