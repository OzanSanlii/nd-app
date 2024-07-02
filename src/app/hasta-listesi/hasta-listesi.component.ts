import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet , RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HastaData, HastaDataService } from '../hasta-data/hasta-data';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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

  ngOnInit(): void {
    this.fetchData();
  }

  goToHomePage(){
    this.router.navigate([''])
  }

  fetchData(): void {
    this._hastaDataService.fetchHastaDataByDosyano();
    this._hastaDataService.hastasData$.subscribe((data) => {
      this.hastasData = data;
      this.initialHastasData = data;
      this.totalItems = this.hastasData.length;
    });
    
  }

  goToHastaDetay(dosyano: string): void {
    this.router.navigate(['/hasta-detay/', dosyano]);
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePageData();
    }
  }

  nextPage(): void {
    if ((this.pageIndex + 1) * this.pageSize < this.totalItems) {
      this.pageIndex++;
      this.updatePageData();
    }
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


  getPaginatorRange(totalItems: number): number[] {
    const pageRange: number[] = [];
    const pageCount = Math.ceil(totalItems / this.pageSize);
    for (let i = 0; i < pageCount; i++) {
      pageRange.push(i);
    }
    return pageRange;
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
