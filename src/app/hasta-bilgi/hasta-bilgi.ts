import { BehaviorSubject, Observable, firstValueFrom, map, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { DataService } from '../request-services/request-service';
//import { ResponseClass } from '../response-class/response-class';

export class HastaBilgi {

    dosyano : string;
    kartno: number | null;
    gelistarih : Date;
    hastabilgi : string;

    constructor(data:any){
        this.dosyano = data.dosyano || "";
        this.kartno = data.kartno || null;
        this.gelistarih = new Date(data.gelistarih);
        this.hastabilgi = data.hastabilgi || "";

    }

}

@Injectable({ providedIn: 'root' })
export class HastaBilgiService{

    private hastaBilgi = new BehaviorSubject<HastaBilgi | null>(null);
    hastaBilgi$ = this.hastaBilgi.asObservable();

    constructor(private _dataService: DataService) {}

    setHastaBilgi(hData: HastaBilgi) {
        this.hastaBilgi.next(hData);
    }

    fetchBilgi(dosyano: string): void {
        this._dataService.getData(`Bilgi/${dosyano}`).pipe(
            tap((res: any) => {
                this.setHastaBilgi(res);
            })
        )
            .subscribe({
                next: data => console.log('Data geldi 3', data),
                error: err => console.error('Error fetching data', err)
            });
    }
}