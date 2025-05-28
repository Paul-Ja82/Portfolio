import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss'
})
export class LegalComponent {


  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.addTag({
      name: 'robots',
      content: 'noindex, nofollow'
    });
  }
}
