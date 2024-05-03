import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asset, AssetData } from 'src/app/core/interfaces/market';
import { Router } from '@angular/router';

@Component({
  selector: 'mainvest-table-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-line.component.html',
  styleUrls: ['./table-line.component.scss']
})
export class TableLineComponent {
  @Input() asset: AssetData = {
    name: '',
    price: 0,
    variation: 0,
    volume: 0
  }

  constructor(private route: Router) {}

  public getAbsolute(variation: number): number {
    return Math.abs(variation);
  }

  public getAsset() : void {
    this.route.navigate([`/dashboard/market/asset/${this.asset.name}`]);
  }
}
