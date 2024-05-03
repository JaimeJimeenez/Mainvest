export interface Wallet {
  id: number;
  name: string;
  total_value: number;
  assets: Asset[];
}

export interface Asset {
  name: string;
  amount: number;
}
