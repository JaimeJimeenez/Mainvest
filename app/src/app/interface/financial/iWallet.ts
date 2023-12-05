export interface IWallet {
  id : number;
  name : string;
  assets : IAssetWallet[];
}

export interface IAssetWallet {
  name : string;
  amount : number;
}

export interface IWalletInfo {
  name : string;
  total : number;
  numberOfAssets : number;
}
