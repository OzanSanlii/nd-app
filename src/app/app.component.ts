import { Component } from '@angular/core';
import { HastaListesiComponent } from './hasta-listesi/hasta-listesi.component';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Doktor-app';

  constructor(private router: Router) {}

}
