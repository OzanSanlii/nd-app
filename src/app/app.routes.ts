import { RouterModule, Routes, provideRouter } from '@angular/router';
import { HastaListesiComponent } from './hasta-listesi/hasta-listesi.component';
import { ApplicationConfig, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { HastaDetayComponent } from './hasta-detay/hasta-detay.component';

export const routes: Routes = [
    { path : 'app.component', component: AppComponent},
    { path: 'hasta-listesi', component: HastaListesiComponent },
    { path:'', component: AnaSayfaComponent},
    { path: '', redirectTo: '/ana-sayfa', pathMatch: 'full' }, 
    { path: 'ana-sayfa', component: AnaSayfaComponent },
    { path: 'hasta-detay/:dosyano', component: HastaDetayComponent }
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }