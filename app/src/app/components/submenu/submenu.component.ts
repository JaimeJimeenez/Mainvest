import { Component, EventEmitter, Input, Output, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'

import { IRoutes } from 'src/app/interface/main/iRoutes';
import { CardMoneyComponent } from '../card-money/card-money.component';

registerLocaleData(localeEs, 'es-EUR');

@Component({
  standalone: true,
  imports: [CommonModule, CardMoneyComponent],
  selector: 'mainvest-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-EUR',
    }
  ]
})
export class SubmenuComponent {
  @Input() menuOptions : IRoutes[] = [];
  @Input() userOptions : IRoutes[] = [];
  @Input() isUsersProfile : boolean = false;
  @Input() credits : number = 0;
  @Output() selectedOption = new EventEmitter<number>();

  public optionSelected : number = 0;

  constructor() {
    setTimeout(() => {
      this._updateSubmenu(0);
    }, 0);
    console.log(this.credits);
  }

  onSelectedOption(selected : IRoutes) : void {
    const option : number = this.menuOptions.indexOf(selected);
    this._updateSubmenu(option);
    this.selectedOption.emit(option);
  }

  onSelectedUsersOptions() : void {
    this.selectedOption.emit(5);
    this._updateUsersOptions(5);
  }

  private _updateUsersOptions(option : number) : void {
    Array.from(document.getElementsByClassName('submenu--option')).forEach((element) => element.classList.remove('selected'))
    const element : Element = document.getElementsByClassName('submenu--option')[option];
    if (element)
      element.classList.add('selected--user');
  }

  private _updateSubmenu(option : number) : void {
    const elements = Array.from(document.getElementsByClassName('submenu--option'));
    elements.forEach((element) => element.classList.remove('selected'));
    elements.forEach((element) => element.classList.remove('selected--user'));
    const element : Element = document.getElementsByClassName('submenu--option')[option];
    if (element)
      element.classList.add('selected');
  }
}
