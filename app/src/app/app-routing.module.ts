import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path: '',
    redirectTo: 'mainvest',
    pathMatch: 'full',
  },
  {
    path: 'mainvest',
    loadChildren: () =>
      import('./mainvest/mainvest.module').then(
        (module) => module.MainvestModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
