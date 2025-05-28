import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule],  
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
}
