import { BehaviorSubject, Observable, firstValueFrom, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../request-services/request-service';

// HastaData modelinizi buraya ekleyin
export class HastaData {
    ad: string;
    adres: string;
    anaad: string;
    anaisyeri: string;
    anameslek: string;
    anatel: string;
    anneDosyano: string | null;
    ceptel: string | null;
    cinsiyet: string;
    cocukSirano: number | null;
    dogumsirasi: number | null;
    dogumtarih: Date;
    formattedDogumtarih: string;  
    dogumyer: string;
    dosyano: string;
    eklemeTarihi: Date | null;
    eposta: string | null;
    esad: string;
    esisyeri: string;
    esmeslek: string;
    estel: string;
    evtel: string;
    evulke: string | null;
    faks: string | null;
    grup: string;
    il: string;
    ilce: string;
    iletişim: string | null;
    isadres: string;
    isil: string;
    isilce: string;
    istel: string;
    kangrup: string;
    karneno: number | null;
    kartadres: string;
    kullanici: string;
    medenihal: string;
    meslek: string;
    notlar: string;
    resim: string | null;
    sicilno: string | null;
    sigortaliTuru: string | null;
    soyad: string;
    vatandaslikno: string | null;
    yakinAdi: string | null;
    yakinDerecesi: string | null;

    constructor(data: any) {
        this.ad = data.ad || "";
        this.adres = data.adres || "";
        this.anaad = data.anaad || "";
        this.anaisyeri = data.anaisyeri || "";
        this.anameslek = data.anameslek || "";
        this.anatel = data.anatel || "";
        this.anneDosyano = data.anneDosyano || null;
        this.ceptel = data.ceptel || null;
        this.cinsiyet = data.cinsiyet || "";
        this.cocukSirano = data.cocukSirano || null;
        this.dogumsirasi = data.dogumsirasi || null;
        this.dogumtarih = new Date(data.dogumtarih);
        this.formattedDogumtarih = "";
        this.dogumyer = data.dogumyer || "";
        this.dosyano = data.dosyano || "";
        this.eklemeTarihi = data.eklemeTarihi ? new Date(data.eklemeTarihi) : null;
        this.eposta = data.eposta || null;
        this.esad = data.esad || "";
        this.esisyeri = data.esisyeri || "";
        this.esmeslek = data.esmeslek || "";
        this.estel = data.estel || "";
        this.evtel = data.evtel || "";
        this.evulke = data.evulke || null;
        this.faks = data.faks || null;
        this.grup = data.grup || "";
        this.il = data.il || "";
        this.ilce = data.ilce || "";
        this.iletişim = data.iletişim || null;
        this.isadres = data.isadres || "";
        this.isil = data.isil || "";
        this.isilce = data.isilce || "";
        this.istel = data.istel || "";
        this.kangrup = data.kangrup || "";
        this.karneno = data.karneno || null;
        this.kartadres = data.kartadres || "";
        this.kullanici = data.kullanici || "";
        this.medenihal = data.medenihal || "";
        this.meslek = data.meslek || "";
        this.notlar = data.notlar || "";
        this.resim = data.resim || null;
        this.sicilno = data.sicilno || null;
        this.sigortaliTuru = data.sigortaliTuru || null;
        this.soyad = data.soyad || "";
        this.vatandaslikno = data.vatandaslikno || null;
        this.yakinAdi = data.yakinAdi || null;
        this.yakinDerecesi = data.yakinDerecesi || null;
    }
}


export interface PaginatedResult<T> {
    data: T[];
    totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class HastaDataService {
  private _hastasData = new BehaviorSubject<HastaData[]>([]);
  hastasData$ = this._hastasData.asObservable();

  private hastaData = new BehaviorSubject<HastaData | null>(null);
  hastaData$ = this.hastaData.asObservable();

  constructor(private _dataService: DataService, private http: HttpClient) { }

  setHastasData(value: HastaData[]) {
    this._hastasData.next(value);
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

  setHastaData(hData: HastaData) {
    this.hastaData.next(hData);
  }

  getHastasData(): HastaData | null {
    return this.hastaData.getValue();
  }

  searchByName(searchValue: string): Observable<HastaData[]> {
    return this.http.get<HastaData[]>(`http://localhost:5199/api/Kimlik/SearchByName/${searchValue}`);
  }

  fetchFullDetail(dosyano: string): void {
    this._dataService.getData(`Kimlik/${dosyano}`).pipe(
        tap((res: any) => {
            // Ensure dogumtarih is a Date object and format it
            if (res.dogumtarih) {
                res.dogumtarih = new Date(res.dogumtarih);
                res.formattedDogumtarih = this.getFormattedStartDate(res.dogumtarih);
            }
            this.setHastaData(res);
        })
    )
    .subscribe({
        next: data => console.log('Data geldi 2', data),
        error: err => console.error('Error fetching data', err)
    });
}

fetchHastaDataByDosyano(pageIndex: number, pageSize: number): void {
    this._dataService.getDatas(`Kimlik/GetData?pageIndex=${pageIndex}&pageSize=${pageSize}`).pipe(
      tap((res: PaginatedResult<HastaData>) => {
        res.data.forEach(hasta => {
          hasta.dogumtarih = new Date(hasta.dogumtarih);  // Ensure dogumtarih is a Date object
          hasta.formattedDogumtarih = this.getFormattedStartDate(hasta.dogumtarih);  // Add formatted date
        });
        this.setHastasData(res.data);  
        this._hastasData.next(res.data);
      })
    ).subscribe({
      error: err => console.error('Error fetching data', err)
    });
  }
}




