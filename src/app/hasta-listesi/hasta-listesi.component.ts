import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HastaData, HastaDataService } from '../hasta-data/hasta-data';



@Component({
  selector: 'hasta-listesi',
  standalone: true,
  imports: [NgFor, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule ],
  templateUrl: './hasta-listesi.component.html',
  styleUrl: './hasta-listesi.component.scss'
})

export class HastaListesiComponent implements OnInit {
  constructor(
    private router: Router,
    private _hastaDataService: HastaDataService,
    private cdr: ChangeDetectorRef) {}

  hastasData : HastaData[] = [];
  hastaData : HastaData | null = null;
  filteredHastaBilgileri: any[] = []
  searchText : string = '';
  dosyano : string ='';

  
  heroes = [
    {  name: 'Ozan Şanlı', kayitNumarasi: '542324' },
    {  name: 'Anıl Demiroğlu' , kayitNumarasi: '4567245'},
    {  name: 'Alcune' , kayitNumarasi: '72455345'},
    {  name: 'xigrealf' , kayitNumarasi: '473567' },
    {  name: 'Magneta' , kayitNumarasi: '224566'},
    {  name: 'RubberMan' , kayitNumarasi: '62457245'}, 
    {  name: 'Dynama' , kayitNumarasi: '5695198'},
    {  name: 'Dr IQ' , kayitNumarasi: '561965195'},
    {  name: 'Magma' , kayitNumarasi: '595498'},
    {  name: 'Tornado' , kayitNumarasi: '12246346'}
  ];

  ngOnInit(): void{
    this._hastaDataService.fetchHastaDataByDosyano(this.dosyano);
    this._hastaDataService.hastaData$.subscribe((data) =>{
      this.hastaData = data;
      this.cdr.detectChanges();
    })
  }


  goToHastaDetay(): void {
    this.router.navigate(['/hasta-detay']);
  }

  searchName($event:Event){
    const input = $event.target as HTMLInputElement;
    console.log(input.value);

    this.filteredHastaBilgileri = this.heroes.filter((hastalar) => {
      if(
        hastalar.name.toLowerCase().includes(input.value.toLowerCase())
      ) {
        return hastalar;
      }
      if(
        hastalar.kayitNumarasi.includes(input.value)
      ){
        return hastalar;
      }

      else{
        return console.log("nono")
      }
    });

  };
  
}
