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

  triggerFooterIconAnimation(target: 'github' | 'linkedin' | 'email'): void {
  const idMap = {
    github: 'icon-github',
    linkedin: 'icon-linkedin',
    email: 'icon-email',
  };

  const icon = document.getElementById(idMap[target]);

  if (icon) {
    icon.classList.remove('animate');
    void icon.offsetWidth; // Reflow, damit die Animation neu startet
    icon.classList.add('animate');
    icon.style.opacity = '1';

    setTimeout(() => {
      icon.classList.remove('animate');
      icon.style.opacity = '0';
    }, 1000); // nach 1s wieder ausblenden
  }
}

}
