import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppCalendar, HastaCalendarService } from '../randevu-takvim/app-calendar';

@Component({
  selector: 'app-ana-sayfa',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './ana-sayfa.component.html',
  styleUrl: './ana-sayfa.component.scss'
})
export class AnaSayfaComponent {
  constructor(
    private router: Router,
    private _hastaCalendarService : HastaCalendarService) {}

    hastaCalendars: AppCalendar[] = [];

  ngOnInit(): void {
    this._hastaCalendarService.fetchHastaGelis();
    this._hastaCalendarService.hastaCalendars$.subscribe((data) => {
      this.hastaCalendars = data;
    });

  }

  goToHastaListesi(): void {
    this.router.navigate(['/hasta-listesi']);
  }

}
