import { BehaviorSubject, Observable, firstValueFrom, map, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { DataService } from '../request-services/request-service';

export class AppCalendar{

    subject : string;
    startDate : Date;
    appointmentDate : Date;
    
    constructor(data: any){

        this.subject = data.dosyano || "";
        this.startDate = new Date(data.startDate);
        this.appointmentDate = new Date(data.appointmentDate);
        
    }

}

@Injectable({ providedIn: 'root' })
export class HastaCalendarService{

    private hastaCalendars= new BehaviorSubject<AppCalendar[]>([]);
    hastaCalendars$ = this.hastaCalendars.asObservable();

    private hastaCalendar = new BehaviorSubject<AppCalendar | null>(null);
    hastaCalendar$ = this.hastaCalendar.asObservable();

    constructor(private _dataService: DataService) {}

    setCalendarData(gData: AppCalendar) {
        this.hastaCalendar.next(gData);
    }

    fetchHastaGelis(): void{
        this._dataService.getData(`Gelisler/events`,).pipe(
            tap((res: any) => {
                this.setCalendarData(res);
            })
        )
            .subscribe({
                next: data => console.log('Data Calendar geldi 2', data),
                error: err => console.error('Error fetching data Calendar', err)
            });
    }

}