export interface Wallet {
  id: number;
  name: string;
  total_value: number;
  assets: Asset[];
}

export interface Asset {
  id?: number;
  name: string;
  amount: number;
}

export interface NewWallet {
  idUser: number;
  name: string;
}

export interface UpdateWallet {
  idAsset: number;
  amount: number;
}
