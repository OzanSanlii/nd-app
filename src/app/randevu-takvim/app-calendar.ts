import { BehaviorSubject, Observable, firstValueFrom, map, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { DataService } from '../request-services/request-service';

export class AppCalendar {
    subject: string;
    startDate: Date;
    appointmentDate: Date;

    constructor(data: any) {
        console.log('Constructing with data:', data); 

        this.subject = data.subject || ""; 
        this.startDate = new Date(data.start); 
        this.appointmentDate = new Date(data.end); 

        if (isNaN(this.startDate.getTime())) {
            console.error('Invalid startDate:', data.start);
        }
        if (isNaN(this.appointmentDate.getTime())) {
            console.error('Invalid appointmentDate:', data.end);
        }
    }

    formatDate(date: Date): string {
        return date.toLocaleString('tr-TR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    getFormattedStartDate(): string {
        return this.formatDate(this.startDate);
    }

    getFormattedAppointmentDate(): string {
        return this.formatDate(this.appointmentDate);
    }
}


@Injectable({ providedIn: 'root' })
export class HastaCalendarService {
    private hastaCalendars = new BehaviorSubject<AppCalendar[]>([]);
    hastaCalendars$ = this.hastaCalendars.asObservable();

    private hastaCalendar = new BehaviorSubject<AppCalendar | null>(null);
    hastaCalendar$ = this.hastaCalendar.asObservable();

    constructor(private _dataService: DataService) {}

    setCalendarData(gData: AppCalendar[]) {
        this.hastaCalendars.next(gData);
    }

    fetchHastaCalendar(): void {
        this._dataService.getData('calendar/events').pipe(
            tap((res: any) => {
                console.log('Raw data:', res); 
                const calendars = Array.isArray(res) ? res.map(item => new AppCalendar(item)) : [];
                this.setCalendarData(calendars);
            })
        ).subscribe({
            next: data => console.log('Data Calendar geldi', data),
            error: err => console.error('Error fetching data Calendar', err)
        });
    }
}
