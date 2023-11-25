export interface IWallet {
  name : string;
  assets : IAssetWallet[];
}

export interface IAssetWallet {
  name : string;
  amount : number;
}
