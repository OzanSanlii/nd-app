import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ana-sayfa',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './ana-sayfa.component.html',
  styleUrl: './ana-sayfa.component.scss'
})
export class AnaSayfaComponent {
  constructor(private router: Router) {}

  goToHastaListesi(): void {
    this.router.navigate(['/hasta-listesi']);
  }

}
