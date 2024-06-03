import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card"; 
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'hasta-detay',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatTabsModule, MatListModule, MatFormFieldModule, MatCardModule, MatInputModule, MatIconModule],
  templateUrl: './hasta-detay.component.html',
  styleUrl: './hasta-detay.component.scss'
})
export class HastaDetayComponent {

  constructor(private router: Router) {}

  

}
