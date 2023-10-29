import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMenuOptions } from 'src/app/interface/iMenuOptions';
import { IRoutes } from 'src/app/interface/main/iRoutes';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'mainvest-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent {
  @Input() menuOptions : IRoutes[] = [];
  @Input() userOptions : IRoutes[] = [];
  @Input() isUsersProfile : boolean = false;
  @Output() selectedOption = new EventEmitter<number>();

  public optionSelected : number = 0;

  constructor() {
    setTimeout(() => {
      this._updateSubmenu(0);
    }, 0);
  }

  onSelectedOption(selected : IRoutes) : void {
    const option : number = this.menuOptions.indexOf(selected);
    this._updateSubmenu(option);
    this.selectedOption.emit(option);
  }

  onSelectedUsersOptions() : void {
    this.selectedOption.emit(4);
    this._updateUsersOptions(4);
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
