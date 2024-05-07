import { WalletDTO } from "src/app/infraestructure/dto/wallet.dto";
import { Asset, Wallet } from "../interfaces/wallet";

export class WalletMapper {

  public static fromAPIToDomain(wallets: WalletDTO[]): Wallet[] {
    const walletsDomain: Wallet[] = [];
    const ids = Array.from(new Set(wallets.map((wallet: WalletDTO) => wallet.id)));
    console.log(wallets);

    ids.forEach((id: number) => {
      const filtered: WalletDTO[] = wallets.filter((wallet: WalletDTO) => wallet.id === id);
      const assets: Asset[] = []

      filtered.forEach((wallet: WalletDTO) => {
        const asset: Asset = { id: wallet.idasset, name: wallet.asset, amount: wallet.amount };
        assets.push(asset);
      });

      const findIndex = wallets.findIndex((walletDTO: WalletDTO) => walletDTO.id === id);
      const wallet: Wallet = {
        id: id,
        name: wallets[findIndex].name,
        total_value: 0,
        assets
      };
      walletsDomain.push(wallet);
    });
    return walletsDomain;
  }
}
