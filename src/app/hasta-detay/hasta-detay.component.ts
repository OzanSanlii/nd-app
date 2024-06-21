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
    hastaBilgiText: string | null = ''; 
    not: string | null = '';

    

    getHastaBilgi() {
      if (this.hastaBilgi?.hastabilgi != null)
      this.hastaBilgiText = this.hastaBilgi?.hastabilgi;
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
            this.hastaGelis = data;
          });

          this._hastaBilgiService.fetchBilgi(dosyaNo);
          this._hastaBilgiService.hastaBilgi$.subscribe((data) =>{
            this.hastaBilgi = data;
            
          })
      });
    
      
  }
  }
  

