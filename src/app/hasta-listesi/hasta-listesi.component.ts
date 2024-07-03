import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet , RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HastaData, HastaDataService } from '../hasta-data/hasta-data';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {JsonPipe} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-hasta-listesi',
  standalone: true,
  imports: [NgFor, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatPaginatorModule ],
  templateUrl: './hasta-listesi.component.html',
  styleUrls: ['./hasta-listesi.component.scss']
})
export class HastaListesiComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private _hastaDataService: HastaDataService
  ) {}

  hastasData: HastaData[] = [];
  initialHastasData: HastaData[] = [];
  totalItems: number = 0;
  pageSize: number = 100; 
  pageIndex: number = 0; 
  pageSizeOptions = [25, 50, 100];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  
 

  ngOnInit(): void {
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
      this.totalItems = this.hastasData.length;
    });

  }

  handlePageEvent(event: PageEvent) {
    this.totalItems = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.hastasData = this.initialHastasData.slice(startIndex, endIndex);
    
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

  searchName($event:Event){
    const input = ($event.target as HTMLInputElement).value.toLowerCase();
    if (this.hastasData !== null) {
      const filteredData = this.hastasData.filter((hastalar) => {
        let nameParts = input.split(" ");
        if(nameParts.length > 1)
          {
            let myName = "";
            let mySurname = "";
            for(let i = 0; i<nameParts.length -1; i++)
              {
                myName += nameParts[i] + " ";
              }
              myName = myName.slice(0, -1);
              mySurname = nameParts[nameParts.length - 1];
              return (hastalar.ad.toLowerCase().includes(myName) && (hastalar.soyad.toLowerCase().includes(mySurname) || hastalar.dosyano.includes(input)));
          }
          return (
          hastalar.ad.toLowerCase().includes(input) ||
          hastalar.soyad.toLowerCase().includes(input) ||
          hastalar.dosyano.includes(input)

        );
      });
      this.totalItems = this.hastasData.length;
      this.hastasData = input ? filteredData : this.initialHastasData;
      
      
    }
  }
}
