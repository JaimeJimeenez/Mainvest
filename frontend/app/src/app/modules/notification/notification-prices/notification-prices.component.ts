import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { ASSETS } from 'src/app/const/asset';

import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { Alert } from 'src/app/core/interfaces/alert';

import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';
import { AlertRepositoryImpl } from 'src/app/infraestructure/data/repositories/alert.repository.impl';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'mainvest-notification-prices',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './notification-prices.component.html',
  styleUrls: ['./notification-prices.component.scss']
})
export class NotificationPricesComponent {
  private _userId: number = 0;
  private _assets: Map<string, number> = new Map<string, number>();

  public alerts: Alert[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userIdObservable: UserIdObservableService,
    private marketRepository: MarketRepositoryImpl,
    private alertRepository: AlertRepositoryImpl
  ) {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const id: string | null = params.get('id');
      if (id !== null) {
        this._userId = +id;
        this.userIdObservable.sendUserId(+id);
        await this._getPrices();
        await this._getAlerts();
      }
    });
  }

  private async _getPrices(): Promise<void> {
    try {
      const assetsData = await lastValueFrom(this.marketRepository.getTodayAssetsData$(ASSETS));
      ASSETS.forEach((asset: string) => {
        const price = assetsData.get(asset);
        if (price !== undefined) {
          this._assets.set(asset, price[0].adj_close);
        }
      });
    } catch (error) {
      throw error;
    }
  }

  private async _getAlerts(): Promise<void> {
    try {
      const alerts: Alert[] = await lastValueFrom(this.alertRepository.getUserAlerts$(this._userId));
      alerts.forEach((alert: Alert) => {
        const asset = this._assets.get(alert.name);
        if (asset !== undefined && asset >= alert.price) {
          this.alerts.push(alert);
        }
      });
    } catch (error) {
      throw error;
    }
  }

  public async onEraseNotification(index: number): Promise<void> {
    try {
      await lastValueFrom(this.alertRepository.deleteAlert$(this.alerts[index].id!));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  public onShowAsset(index: number): void {
    this.router.navigate([`/dashboard/market/asset/${this.alerts[index].name}`]);
  }
}
