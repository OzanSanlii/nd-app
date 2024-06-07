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

@Component({
  selector: 'hasta-detay',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatTabsModule, MatListModule, MatFormFieldModule, MatCardModule, MatInputModule, MatIconModule],
  templateUrl: './hasta-detay.component.html',
  styleUrl: './hasta-detay.component.scss'
})
export class HastaDetayComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _hastaDataService: HastaDataService,
    private cdr: ChangeDetectorRef) {}

    hastasData : HastaData[] = [];
    initialHastasData : HastaData[] = [];
    hastaData : HastaData | null = null;
    filteredHastaBilgileri: any[] = []
    searchText : string = '';
    dosyano : string =''; 

  
  ngOnInit(): void{
    this.route.paramMap.subscribe(params =>{
      //this.dosyano = params.get('dosyano')
    })
  }
}
