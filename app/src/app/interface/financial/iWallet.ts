export interface IWallet {
  id : number;
  name : string;
  assets : IAssetWallet[];
}

export interface IAssetWallet {
  name : string;
  amount : number;
}
