import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card"; 
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { HastaData, HastaDataService } from '../hasta-data/hasta-data';
import { HastaGelis, HastaGelisService } from '../hasta-gelisler/hasta-gelisler';
import { HastaBilgi, HastaBilgiService } from '../hasta-bilgi/hasta-bilgi';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../request-services/request-service';

@Component({
  selector: 'hasta-detay',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatTabsModule, MatListModule, MatFormFieldModule, MatCardModule, MatInputModule, MatIconModule,
    FormsModule],
  templateUrl: './hasta-detay.component.html',
  styleUrl: './hasta-detay.component.scss'
})
export class HastaDetayComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _hastaDataService: HastaDataService,
    private _hastaGelisService : HastaGelisService,
    private _hastaBilgiService : HastaBilgiService,
    private _requestSerivce : DataService,
    private cdr: ChangeDetectorRef) {}

    hastasData : HastaData[] = [];
    initialHastasData : HastaData[] = [];
    hastaData : HastaData | null = null;
    hastasBilgi : HastaBilgi[]= [];
    hastaBilgi : HastaBilgi | null = null;
    filteredHastaBilgileri: any[] = []
    searchText : string = '';
    dosyano : string | null = ''; 
    hastaGelis : HastaGelis | null = null;
    hastaGelisler : HastaGelis[]= [];
    hastaBilgiText: string | null = ''; 
    not: string | null = '';
    selectedHastaBilgi: HastaBilgi | null = null;

    

    getHastaBilgi() {
      if (this.hastaBilgi?.hastabilgi != null)
      this.hastaBilgiText = this.hastaBilgi?.hastabilgi;
    }

    goToHomePage(){
      this.router.navigate([''])
    }

    goToHastaListe(){
      this.router.navigate(['/hasta-listesi'])
    }

    kaydet() {
      const notBilgi = this.not;
      const dosyano = this.route.snapshot.params['dosyano']; 
      this._hastaBilgiService.putData({ Dosyano: dosyano, HastaBilgi: notBilgi }) 
        .subscribe({
            next: (response: any) => {
                console.log('sub başarili', response);         
            },
            error: (error: any) => {
                console.error('Not hata.', error);
            }
        });    
    };

    gonder() {
      const notBilgi = this.not;
      const dosyano = this.route.snapshot.params['dosyano']; 
      this._hastaBilgiService.putData({ Dosyano: dosyano, HastaBilgi: notBilgi }) 
        .subscribe({
            next: (response: any) => {
                console.log('sub başarili', response);         
            },
            error: (error: any) => {
                console.error('Not hata.', error);
            }
        });    
    };
    
    selectNot(index: number): void {
      if (this.hastasBilgi.length >= index) {
        this.selectedHastaBilgi = this.hastasBilgi[index - 1];
      }
    }
    

    ngOnInit(): void {
      this.route.params.subscribe(params => {
          const dosyaNo = params['dosyano'];
          console.log('Dosya Numarası:', dosyaNo);
          this._hastaDataService.fetchFullDetail(dosyaNo);
          this._hastaDataService.hastaData$.subscribe((data) => {
              this.hastaData = data;
          });

          this._hastaGelisService.fetchHastaGelis(dosyaNo);
          this._hastaGelisService.hastaGelis$.subscribe((data) => {
            if (data === null) {
              this.hastaGelisler = []; 
            } else {
              this.hastaGelisler = Array.isArray(data) ? data : [data]; 
            }
            this.cdr.detectChanges();
            console.log('Hasta Gelis:', this.hastaGelisler);
          });

          this._hastaBilgiService.fetchBilgi(dosyaNo);
          this._hastaBilgiService.hastaBilgi$.subscribe((data) => {
            if (data === null) {
              this.hastasBilgi = []; 
            } else {
              this.hastasBilgi = Array.isArray(data) ? data : [data]; 
            }
            this.cdr.detectChanges();
            console.log('Hasta Bilgileri:', this.hastasBilgi);
      });
          
      });

      
    
      
  }
  }
  

