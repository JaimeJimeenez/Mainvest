import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes : Routes = [
  {
    path: '',
    redirectTo: 'mainvest',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(
        m => m.AuthModule
      ),
  },
  {
    path: 'mainvest',
    loadChildren: () =>
      import('./mainvest/mainvest.module').then(
        (module) => module.MainvestModule
      ),
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
