import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMenuOptions } from 'src/app/interface/iMenuOptions';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'mainvest-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent {
  @Input() menuOptions : IMenuOptions[] = [];
  @Output() selectedOption = new EventEmitter<number>();

  onSelectedOption(selected : IMenuOptions) {
    const option : number = this.menuOptions.indexOf(selected);
    this._updateSubmenu(option);
    this.selectedOption.emit(option);
  }

  private _updateSubmenu(option : number) : void {
    Array.from(document.getElementsByClassName('submenu--option')).forEach((element) => element.classList.remove('selected'))
    const element : Element = document.getElementsByClassName('submenu--option')[option];
    element.classList.add('selected');
  }
}
