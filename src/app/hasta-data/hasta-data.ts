import { BehaviorSubject, Observable, firstValueFrom, map, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { DataService } from '../request-services/request-service';
//import { ResponseClass } from '../response-class/response-class';

export class HastaData {
    ad: string;
    soyad: string;
    dosyano: string;

    constructor(_ad:string, _soyad: string, _dosyaNo:string)
    {
        this.ad = _ad;
        this.soyad = _soyad;
        this.dosyano = _dosyaNo;
    }
}

@Injectable({ providedIn: 'root' })
export class HastaDataService{

    private _hastasData = new BehaviorSubject<HastaData[]>([]);
    hastasData$ = this._hastasData.asObservable();

    private hastaData = new BehaviorSubject<HastaData | null>(null);

    hastaData$ = this.hastaData.asObservable();

    constructor(private _dataService: DataService) {
    }

    setHastasData(value: HastaData[]) {
        this._hastasData.next(value);
    }

    setHastaData(hData: HastaData) {
        this.hastaData.next(hData);
    }

    async getHastaData(_dosyaNo: string): Promise<HastaData> {
        const result$ = this._dataService.getData(`Kimlik/${_dosyaNo}`).pipe(
            map((response: any) => {
                return response.data; 
            }));
        
        return firstValueFrom(result$);
    }

    getHastasData(): HastaData | null {
        return this.hastaData.getValue();
    }

    fetchHastaDataByDosyano(): void {
        console.log("HERE");
        this._dataService.getData(`GetData`).pipe(
            tap((res: any) => {
                this.setHastaData(res.data);
                console.log("bura", res.data)
            })
        )
        .subscribe({
            next: () => console.log('Data fetched successfully'),
            error: err => console.error('Error fetching data', err)
        });
    }
    
    
    

}