import { BehaviorSubject, Observable, catchError, firstValueFrom, map, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { DataService } from '../request-services/request-service';
//import { ResponseClass } from '../response-class/response-class';

export class HastaBilgi {

    dosyano : string;
    kartno: number | null;
    gelistarih : Date;
    hastabilgi : string;
    yeninot : string;

    constructor(data:any){
        this.dosyano = data.dosyano || "";
        this.kartno = data.kartno || null;
        this.gelistarih = new Date(data.gelistarih);
        this.hastabilgi = data.hastabilgi || "";
        this.yeninot = data.yeninot || "";
    }

}

@Injectable({ providedIn: 'root' })
export class HastaBilgiService{

    private hastasBilgi = new BehaviorSubject<HastaBilgi[]>([]);
    hastasBilgi$ = this.hastasBilgi.asObservable();

    private hastaBilgi = new BehaviorSubject<HastaBilgi | null>(null);
    hastaBilgi$ = this.hastaBilgi.asObservable();

    constructor(private _dataService: DataService) {}

    setHastasBilgi(value: HastaBilgi[]) {
        this.hastasBilgi.next(value);
    }

    setHastaBilgi(hData: HastaBilgi) {
        this.hastaBilgi.next(hData);
    }



    fetchBilgi(dosyano: string): void {
        this._dataService.getData(`Bilgi/${dosyano}`).pipe(
          tap((res: any) => {
            this.setHastaBilgi(res); // Aldığınız veriyi setHastaBilgi metoduna gönderin
          })
        )
        .subscribe({
          next: data => {
            console.log('Data geldi 3', data); // Veri başarılı bir şekilde alındığında konsola yazdırın
          },
          error: err => {
            console.error('Error fetching data', err); // Hata durumunda konsola hata mesajını yazdırın
          }
        });
      }
      

    putData(data: any): Observable<any> {
        return this._dataService.putData('Bilgi', data).pipe(
            tap((response: any) => {
                console.log('Put başarili', response);
                
            }),
            catchError(error => {
                console.error('Put hatasi', error);
                throw error; 
            })
        );
    }


}