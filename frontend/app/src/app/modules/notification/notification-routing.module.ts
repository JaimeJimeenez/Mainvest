import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotificationMainComponent } from "./notification-main/notification-main.component";
import { NotificationLikesComponent } from "./notification-likes/notification-likes.component";
import { NotificationRepliesComponent } from "./notification-replies/notification-replies.component";
import { NotificationPricesComponent } from "./notification-prices/notification-prices.component";

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
      },
      {
        path: 'replies/:id',
        component: NotificationRepliesComponent
      },
      {
        path: 'prices/:id',
        component: NotificationPricesComponent
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class NotificationRoutingModule { }
