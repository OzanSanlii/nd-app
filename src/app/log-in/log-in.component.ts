import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../Login-service/login-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/ana-sayfa']);
    }
  }

  handleLogin(): void {
    const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);

    this.authService.login(this.username, hashedPassword).subscribe(
      response => {
        this.authService.storeToken(response.token);
        this.router.navigate(['/ana-sayfa']);
      },
      error => {
        console.error('Giriş yapılamadı:', error);
      }
    );
  }
}
