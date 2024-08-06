import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card"; 
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { HastaData, HastaDataService } from '../hasta-data/hasta-data';
import { HastaGelis, HastaGelisService } from '../hasta-gelisler/hasta-gelisler';
import { HastaBilgi, HastaBilgiService } from '../hasta-bilgi/hasta-bilgi';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../request-services/request-service';
import RTF2HTML from 'rtf2html'; 
import { convert } from 'html-to-text';

@Component({
  selector: 'hasta-detay',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatTabsModule, MatListModule, MatFormFieldModule, MatCardModule, MatInputModule, MatIconModule, FormsModule],
  templateUrl: './hasta-detay.component.html',
  styleUrls: ['./hasta-detay.component.scss']
})
export class HastaDetayComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _hastaDataService: HastaDataService,
    private _hastaGelisService: HastaGelisService,
    private _hastaBilgiService: HastaBilgiService,
    private _requestSerivce: DataService,
    private cdr: ChangeDetectorRef) {}

  hastasData: HastaData[] = [];
  initialHastasData: HastaData[] = [];
  hastaData: HastaData | null = null;
  hastasBilgi: HastaBilgi[] = [];
  hastaBilgi: HastaBilgi | null = null;
  filteredHastaBilgileri: any[] = [];
  searchText: string = '';
  dosyano: string | null = ''; 
  hastaGelis: HastaGelis | null = null;
  hastaGelisler: HastaGelis[] = [];
  hastaBilgiText: string | null = ''; 
  not: string | null = '';
  selectedHastaBilgi: { hastabilgi: string } = { hastabilgi: 'Lütfen Bir Not Seçiniz' };
  notlar: { id: number }[] = [];
  selectedHastaBilgiPrevious: { hastabilgi: string } | null = null;
  temporaryChanges = new Map<number, string>();
  selectedKartNo: number = 1;

  getHastaBilgi() {
    if (this.hastaBilgi?.hastabilgi != null)
      this.hastaBilgiText = this.hastaBilgi?.hastabilgi;
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

  goToHastaListe() {
    this.router.navigate(['/hasta-listesi']).then(() => {
      window.location.reload();
    });
  }

  refreshPage(dosyano: string): void {
    this.router.navigate(['/hasta-detay/', dosyano]);
  }

  notUpdate(): void {
    const notBilgi = this.selectedHastaBilgi.hastabilgi;
    const dosyaNo = this.route.snapshot.params['dosyano'];
    const eskiHastaBilgi = this.selectedHastaBilgiPrevious?.hastabilgi;
  
    this._hastaBilgiService.updateData({ yeniBilgi: { Dosyano: dosyaNo, HastaBilgi: notBilgi }, eskiHastaBilgi: eskiHastaBilgi })
      .subscribe({
        next: (response: any) => {
          console.log('Update successful:', response);
          this.selectedHastaBilgiPrevious = { ...this.selectedHastaBilgi };
        },
        error: (error: any) => {
          console.error('Not güncelleme hatası', error);
        }
      });
  };

  notUpdateClick(): void {
    const notBilgi = this.selectedHastaBilgi.hastabilgi;
    const dosyaNo = this.route.snapshot.params['dosyano'];
    
    const eskiHastaBilgi = this.selectedHastaBilgiPrevious?.hastabilgi;
    const rtfNotBilgi = this.convertTextToRTF(notBilgi);

    this._hastaBilgiService.updateData({
        yeniBilgi: { Dosyano: dosyaNo, HastaBilgi: rtfNotBilgi },
        eskiHastaBilgi: eskiHastaBilgi
    }).subscribe({
        next: (response: any) => {
            this.selectedHastaBilgiPrevious = { ...this.selectedHastaBilgi };
            window.location.reload();
        },
        error: (error: any) => {
            console.error('Not güncelleme hatası', error);
        }
    });
}

  convertTextToRTF(text: string): string {
    const rtfHeader = '{\\rtf1\\ansi\\deff0\\pard\\sa200\\sl276\\slmult1';
    const rtfFooter = '}';

    let rtfText = text
        .replace(/([{}])/g, '\\$1') 
        .replace(/\n/g, '\\par '); 
    return `${rtfHeader} ${rtfText} ${rtfFooter}`;
  }
  
  kaydet() {
    var gelisTarih = Date.now();
    const notBilgi = this.not;
    const dosyano = this.route.snapshot.params['dosyano'];
    const gelisno = 1;
    const kartno = this.hastasBilgi.length + 1; 
     
  
    console.log("Saving data with Kartno: ", kartno);  
  
    this._hastaBilgiService.putData({ Dosyano: dosyano, Hastabilgi: notBilgi, DateTime: gelisTarih, Gelisno: gelisno, Kartno: kartno }) 
      .subscribe({
        next: (response: any) => {
          console.log('sub başarılı', response);
          window.location.reload();
        },
        error: (error: any) => {
          console.error('Not hata.', error);
        }
      });
  }

  selectNot(index: number): void {
    if (this.hastasBilgi.length > index - 1) {
      let content = this.hastasBilgi[index - 1].hastabilgi;
  
      if (content.startsWith("{\\rtf1")) {
        const htmlContent = RTF2HTML(content);
        const textContent = convert(htmlContent, { wordwrap: false });
        this.selectedHastaBilgi = { hastabilgi: textContent };
        this.selectedHastaBilgiPrevious = { hastabilgi: content };
        console.log(this.selectedHastaBilgi, this.selectedHastaBilgiPrevious);
      } else {
        this.selectedHastaBilgi = { hastabilgi: content };
        this.selectedHastaBilgiPrevious = { hastabilgi: content };
      }
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
          if (this.notlar != null)
            for (var i = 0; i < this.hastasBilgi.length; i++) {
              this.notlar.push({ id: i + 1 }); 
              this.cdr.detectChanges();
            }
          if (this.hastasBilgi.length > 0) {
            this.selectNot(1);
          }
        }
        this.cdr.detectChanges();
        console.log('Hasta Bilgileri:', this.hastasBilgi);
      });
    });
  }
    
    
  }

