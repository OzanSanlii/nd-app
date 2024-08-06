import { BehaviorSubject, Observable, firstValueFrom, map, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { DataService } from '../request-services/request-service';

export class HastaGelis {
    dosyano: string;
    gelisno: number;
    giristarih: Date;
    girisTarihFormatted: string;
    cikistarih: Date;
    cikisTarihFormatted: string;
    referans: string;
    poliklinik: string;
    doktor: string;

    constructor(data: any) {
        this.gelisno = data.gelisno || "";
        this.dosyano = data.dosyano || "";
        this.giristarih = new Date(data.giristarih);
        this.girisTarihFormatted = data.girisTarihFormatted || "";
        this.cikistarih = new Date(data.cikistarih);
        this.cikisTarihFormatted = data.cikisTarihFormatted || "";
        this.referans = data.referans || "";
        this.poliklinik = data.poliklinik || "";
        this.doktor = data.doktor || "";
    }
}

@Injectable({ providedIn: 'root' })
export class HastaGelisService {
    private hastaGelisler = new BehaviorSubject<HastaGelis[]>([]);
    hastaGelisler$ = this.hastaGelisler.asObservable();

    private hastaGelis = new BehaviorSubject<HastaGelis | null>(null);
    hastaGelis$ = this.hastaGelis.asObservable();

    constructor(private _dataService: DataService) {}

    setGelisData(gData: HastaGelis) {
        this.hastaGelis.next(gData);
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

    getFormattedStartDate(date: Date): string {
        return this.formatDate(date);
    }

    fetchHastaGelis(dosyano: string): void {
        this._dataService.getData(`Gelisler/${dosyano}`).pipe(
            tap((res: any) => {
                if (res.giristarih) {
                    res.giristarih = new Date(res.giristarih);
                    res.girisTarihFormatted = this.getFormattedStartDate(res.giristarih);
                }
                if (res.cikistarih) {
                    res.cikistarih = new Date(res.cikistarih);
                    res.cikisTarihFormatted = this.getFormattedStartDate(res.cikistarih);
                }
                this.setGelisData(res);
            })
        )
        .subscribe({
            next: data => console.log('Data geldi 2', data),
            error: err => console.error('Error fetching data', err)
        });
    }
}
