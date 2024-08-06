import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet , RouterModule, ActivatedRoute} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HastaData, HastaDataService } from '../hasta-data/hasta-data';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import {JsonPipe} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, NgModel} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-hasta-listesi',
  standalone: true,
  imports: [NgFor, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatPaginatorModule, FormsModule ],
  templateUrl: './hasta-listesi.component.html',
  styleUrls: ['./hasta-listesi.component.scss']
})
export class HastaListesiComponent implements OnInit {
  routeSub: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _hastaDataService: HastaDataService
  ) {}

  hastasData: HastaData[] = [];
  initialHastasData: HastaData[] = [];
  totalItems: number = 0;
  pageSize: number = 200; 
  pageIndex: number = 0; 
  pageSizeOptions = [25, 50, 100,200];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  searchInput: string = '';
  
  private searchTimeout: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const dosyaNo = params['dosyano'];
      window.addEventListener('popstate', () => {
        location.reload();
      });
    });
    this.fetchData();
  }

  goToHomePage(){
    this.router.navigate([''])
  }

  fetchData(): void {
    this._hastaDataService.fetchHastaDataByDosyano(this.pageIndex, this.pageSize);
    this._hastaDataService.hastasData$.subscribe((data) => {
      this.hastasData = data;
      this.initialHastasData = data;
      this.totalItems = data.length;
    });

  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData(); 
  }
  

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  goToHastaDetay(dosyano: string): void {
    this.router.navigate(['/hasta-detay/', dosyano]);
  }

  goToPage(page: number): void {
    this.pageIndex = page;
    this.updatePageData();
  }

  updatePageData(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.hastasData = this.initialHastasData.slice(startIndex, endIndex);
  }


  onSearchButtonClick(): void {
   
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
   
    this.searchTimeout = setTimeout(() => {
      const input = this.searchInput.trim().toLowerCase();
      if (input !== '') {
        this._hastaDataService.searchByName(input).subscribe(
          (data) => {
            this.hastasData = data;
            this.totalItems = data.length;
          },
          (error) => {
            console.error('Veri getirme hatası', error);
          }
        );
      } else {
        this.fetchData();
      }
    }, 1200); 
  }
}
