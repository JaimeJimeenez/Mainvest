import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'mainvest-header',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    UserComponent,
    SearchComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
