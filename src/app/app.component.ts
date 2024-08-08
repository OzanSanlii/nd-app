import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // HTTP_INTERCEPTORS importu kaldırıldı

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [] // HTTP_INTERCEPTORS sağlayıcısı kaldırıldı
})
export class AppComponent {
  title = 'Doktor-app';

  constructor(private router: Router) {}
}
