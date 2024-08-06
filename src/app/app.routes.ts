import { RouterModule, Routes, provideRouter } from '@angular/router';
import { HastaListesiComponent } from './hasta-listesi/hasta-listesi.component';
import { ApplicationConfig, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { HastaDetayComponent } from './hasta-detay/hasta-detay.component';
import { LogInComponent } from './log-in/log-in.component';

export const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'hasta-listesi', component: HastaListesiComponent },
  { path: 'hasta-detay/:dosyano', component: HastaDetayComponent },
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'ana-sayfa', component: AnaSayfaComponent }
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }