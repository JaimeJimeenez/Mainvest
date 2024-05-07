import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ASSETS } from 'src/app/const/asset';

@Component({
  selector: 'mainvest-dropdown-asset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-asset.component.html',
  styleUrls: ['./dropdown-asset.component.scss']
})
export class DropdownAssetComponent {
  @Output() selectedAsset: EventEmitter<string> = new EventEmitter<string>();

  public asset: string = ASSETS[0];
  public availableAssets: string[] = ASSETS;

  onSelectedAsset(index: number): void {
    this.asset = ASSETS[index];
    this.selectedAsset.emit(ASSETS[index]);
  }
}
