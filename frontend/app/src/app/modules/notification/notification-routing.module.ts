import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotificationMainComponent } from "./notification-main/notification-main.component";
import { NotificationLikesComponent } from "./notification-likes/notification-likes.component";

const routes: Routes = [
  {
    path: '',
    component: NotificationMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'likes',
        pathMatch: 'full'
      },
      {
        path: 'likes/:id',
        component: NotificationLikesComponent
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class NotificationRoutingModule { }
