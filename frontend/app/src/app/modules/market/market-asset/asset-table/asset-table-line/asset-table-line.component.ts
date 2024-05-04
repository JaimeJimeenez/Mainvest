import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Asset } from 'src/app/core/interfaces/market';
import { DateFormatterPipe } from 'src/app/core/pipe/date-formatter.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, DateFormatterPipe],
  selector: 'mainvest-asset-table-line',
  templateUrl: './asset-table-line.component.html',
  styleUrls: ['./asset-table-line.component.scss']
})
export class AssetTableLineComponent {
  @Input() asset: Asset = {
    adj_close: 0,
    close: 0,
    high: 0,
    low: 0,
    open: 0,
    volume: 0,
    date: ''
  }
}
