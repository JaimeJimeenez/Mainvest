import { AssetDTO } from "src/app/infraestructure/dto/market.dto";
import { Asset } from "../interfaces/market";

export class MarketMapper {

  public static fromAPIToDomain(assetsDataAPI: AssetDTO, assets: string[]): Map<string, Asset[]> {
    const { columns, data, index } = assetsDataAPI;
    const assetsData = new Map<string, Asset[]>();

    assets.forEach((asset) => assetsData.set(asset, []));

    data.forEach((values: number[], i: number) => {
      assets.forEach((asset: string, j: number) => {
        assetsData.get(assets[j])?.push({
          adj_close: values[j],
          close: values[j + assets.length ],
          high: values[j + assets.length * 2 ],
          low: values[j + assets.length * 3 ],
          open: values[j + assets.length * 4 ],
          volume: values[j + assets.length * 5],
          date: index[i]
        });
      });
    });

    return assetsData;
  }
}
