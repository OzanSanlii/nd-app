import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HastaData, HastaDataService } from '../hasta-data/hasta-data';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'hasta-listesi',
  standalone: true,
  imports: [NgFor, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatPaginatorModule ],
  templateUrl: './hasta-listesi.component.html',
  styleUrl: './hasta-listesi.component.scss'
})

export class HastaListesiComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(

    private router: Router,
    private _hastaDataService: HastaDataService,
    private cdr: ChangeDetectorRef) {}

  hastasData : HastaData[] = [];
  initialHastasData : HastaData[] = [];
  hastaData : HastaData | null = null;
  filteredHastaBilgileri: any[] = []
  searchText : string = '';
  dosyano : string ='';
  pageSizeOptions: number[] = [10, 25, 50, 100]; 
  pageSize: number = 50; 
  totalItems: number = 0; 


  ngOnInit(): void {
    this._hastaDataService.fetchHastaDataByDosyano();
    this._hastaDataService.hastasData$.subscribe((data) =>{
      this.hastasData = data;
      this.initialHastasData = data;
      console.log("lalal", this.hastasData);
      this.totalItems = this.hastasData.length; 
      this.cdr.detectChanges(); 
    });
  }
  
  goToHastaDetay(dosyano :string): void {
    console.log("url geldi", dosyano);
    this.router.navigate(['/hasta-detay/', dosyano]);
  }

  goToHomePage(){
    this.router.navigate([''])
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
  
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.hastasData = this.initialHastasData.slice(startIndex, endIndex);
  }
  

};









