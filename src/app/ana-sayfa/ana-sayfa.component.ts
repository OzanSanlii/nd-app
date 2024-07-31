import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card"; 
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppCalendar, HastaCalendarService } from '../randevu-takvim/app-calendar';

@Component({
  selector: 'app-ana-sayfa',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './ana-sayfa.component.html',
  styleUrls: ['./ana-sayfa.component.scss']
})
export class AnaSayfaComponent implements OnInit, OnDestroy {
  hastaCalendars: AppCalendar[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private _hastaCalendarService: HastaCalendarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._hastaCalendarService.fetchHastaCalendar();
    this.subscription = this._hastaCalendarService.hastaCalendars$.subscribe((data) => {
      if (data === null) {
        this.hastaCalendars = [];
      } else {
        this.hastaCalendars = Array.isArray(data) ? data : [data];
      }
      this.cdr.detectChanges();  
      console.log('Hasta Calendar:', this.hastaCalendars);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goToHastaListesi(): void {
    this.router.navigate(['/hasta-listesi']);
  }
}
