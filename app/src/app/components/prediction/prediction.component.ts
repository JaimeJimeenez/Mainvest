import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mainvest-prediction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnChanges {
  @Input() actualPrice: number = 0;
  @Input() predictedPrice: number = 0;

  isLoading: boolean = true;
  options: boolean[] = [false, false, false]; // Buy, don't trade, sell

  constructor() {}

  ngOnInit() {
    if (this.predictedPrice !== 0) {
      this.isLoading = !this.isLoading;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['predictedPrice']) {
      this.isLoading = true;
      if (this.predictedPrice !== 0) {
        this.isLoading = false;
        this._getAdvice();
      }
    }
  }

  private _getAdvice() : void {
    this.options = this.options.map((option : boolean) => option = false);
    const benefits = this.predictedPrice * 100 / this.actualPrice;
    if (benefits - 100 >= 3) this.options[0] = true;
    else if (benefits - 100 < 0) this.options[2] = true;
    else this.options[1] = true;
  }
}
